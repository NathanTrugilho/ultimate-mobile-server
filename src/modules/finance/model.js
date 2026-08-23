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

const FinanceModel = {
    save: (data, callback) => {
        const query = `
            INSERT INTO finance_history (selic, dollar, euro )
            VALUES (?, ?, ?)
        `;
        db.run(query, [data.selic, data.dollar, data.euro], function(err) {
            callback(err, { id: this ? this.lastID : null, ...data });
        });
    },

    list: (callback) => {
        db.all(`SELECT * FROM finance_history ORDER BY id DESC LIMIT 10`, [], (err, rows) => {
            callback(err, rows);
        });
    }
};

module.exports = FinanceModel;