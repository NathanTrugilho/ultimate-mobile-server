const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const financeRoutes = require('./modules/finance/routes');
app.use('/api/finance', financeRoutes);

module.exports = app;