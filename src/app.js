require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes');
require('./mongoConfig');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.get('*', (req, res) => res.status(404).json('Not Found.'));
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json('Internal Server Error');
});

module.exports = app;
