require('dotenv').config();
const request = require('supertest');
const express = require('express');
const router = require('../routes');
const initializeMongoServer = require('./mongoConfigTesting');

initializeMongoServer();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router);

describe('Test the api path', () => {
  it('should response the GET method', async () => {
    const response = await request(app).get('/api');
    expect(response.statusCode).toBe(200);
  });
});

describe('Test the /users path', () => {
  it('should response the GET /users method', async () => {
    const response = await request(app).get(
      '/api/v1/users'
    );
    expect(response.statusCode).toBe(200);
  });
});
