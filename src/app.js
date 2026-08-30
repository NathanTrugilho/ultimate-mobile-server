const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Finance Module
const financeRoutes = require('./modules/finance/routes');
app.use('/api/finance', financeRoutes);

// System Module
const systemRoutes = require('./modules/system/routes');
app.use('/api/system', systemRoutes);

module.exports = app;