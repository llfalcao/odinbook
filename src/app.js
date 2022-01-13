require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const mongodb = process.env.MONGODB;
mongoose.connect(mongodb);
mongoose.connection.on('error', (err) => console.log(err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

// TODO: Handle errors

module.exports = app;
