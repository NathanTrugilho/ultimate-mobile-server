const express = require('express');
const router = express.Router();
const db = require('../../database');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS finance_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        selic REAL,
        dollar REAL,
        euro REAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

router.post('/fetch', async (req, res) => {
    try {
        const [currencyRes, selicRes] = await Promise.all([
            fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL'),
            fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json')
        ]);

        if (!currencyRes.ok || !selicRes.ok) {
            throw new Error('Failed to fetch data from external APIs.');
        }

        const currencyData = await currencyRes.json();
        const selicData = await selicRes.json();

        const dollarBuy = parseFloat(currencyData.USDBRL.bid) || 0;
        const euroBuy = parseFloat(currencyData.EURBRL.bid) || 0;
        const selicTarget = parseFloat(selicData[0]?.valor) || 0;

        const query = `
            INSERT INTO finance_history (selic, dollar, euro )
            VALUES (?, ?, ?)
        `;
        
        db.run(query, [selicTarget, dollarBuy, euroBuy], function(err) {
            if (err) {
                return res.status(500).json({
                    error: 'Failed to process financial data.',
                    details: err.message
                });
            }
            return res.status(201).json({
                message: 'Financial data fetched and stored successfully.',
                data: { id: this ? this.lastID : null, selic: selicTarget, dollar: dollarBuy, euro: euroBuy }
            });
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Failed to process financial data.',
            details: error.message
        });
    }
});

router.get('/history', (req, res) => {
    db.all(`SELECT * FROM finance_history ORDER BY id DESC LIMIT 10`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                error: 'Failed to fetch history.',
                details: err.message
            });
        }
        return res.status(200).json(rows);
    });
});

module.exports = router;