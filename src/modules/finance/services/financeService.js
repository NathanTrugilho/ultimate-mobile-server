const FinanceModel = require('../model');

const FinanceService = {
    fetchAndStoreData: async () => {
        // Fetch currency rates and SELIC target concurrently
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

        const financialData = {
            selic: selicTarget,
            dollar: dollarBuy,
            euro: euroBuy,
        };

        return new Promise((resolve, reject) => {
            FinanceModel.save(financialData, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },

    getHistory: () => {
        return new Promise((resolve, reject) => {
            FinanceModel.list((err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
};

module.exports = FinanceService;