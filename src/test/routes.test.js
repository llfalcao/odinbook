const request = require('supertest');
const app = require('../app');

describe('Test the root path', () => {
  it('should response the GET method', async () => {
    const response = await request(app).get('/');
    return expect(response.statusCode).toBe(200);
  });
});
