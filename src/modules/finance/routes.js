const express = require('express');
const router = express.Router();
const FinanceController = require('./controllers/financeController');

router.post('/fetch', FinanceController.fetchAndSave);
router.get('/history', FinanceController.getHistory);

module.exports = router;