import request from 'supertest';
import app from '../app';

describe('Test the root path', () => {
  it('should response the GET method', async () => {
    const response = await request(app).get('/');
    return expect(response.statusCode).toBe(200);
  });
});
