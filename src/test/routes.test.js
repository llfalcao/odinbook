require('dotenv').config();
require('./mongoConfigTesting');
const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const router = require('../routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

describe('Test the root path', () => {
  it('should response the GET method', async () => {
    const response = await request(app).get('/');
    return expect(response.statusCode).toBe(200);
  });
});

afterAll(() => mongoose.disconnect());
