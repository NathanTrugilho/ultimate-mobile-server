const express = require('express');
const path = require('path');

const app = express();

// Middlewares para interpretação de dados
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve os arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, '../public')));

module.exports = app;