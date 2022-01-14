require('dotenv').config();
const express = require('express');
const router = require('./routes');
require('./mongoConfig');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

// TODO: Handle errors

module.exports = app;
