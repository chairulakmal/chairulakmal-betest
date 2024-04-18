const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('responds with "App is running"', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('App is running');
    expect(response.status).toBe(200);
  });
});
