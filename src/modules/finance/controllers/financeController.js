const FinanceService = require('../services/financeService');

const FinanceController = {
    fetchAndSave: async (req, res) => {
        try {
            const record = await FinanceService.fetchAndStoreData();
            return res.status(201).json({
                message: 'Financial data fetched and stored successfully.',
                data: record
            });
        } catch (error) {
            return res.status(500).json({
                error: 'Failed to process financial data.',
                details: error.message
            });
        }
    },

    getHistory: async (req, res) => {
        try {
            const history = await FinanceService.getHistory();
            return res.status(200).json(history);
        } catch (error) {
            return res.status(500).json({
                error: 'Failed to fetch history.',
                details: error.message
            });
        }
    }
};

module.exports = FinanceController;