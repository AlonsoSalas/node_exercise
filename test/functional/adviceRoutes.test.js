import nock from 'nock';
import request from 'supertest';
import app from 'app';
import './helpers/dbTransaction';

describe('Advice Routes', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    nock('https://api.adviceslip.com')
      .get('/advice/search/test')
      .reply(200, {
        slips: [
          {
            id: 1,
            advice: 'Test advice for the word "test".',
          },
        ],
      });

    nock('https://api.adviceslip.com').get('/advice/search/empty').reply(200, {
      slips: [],
    });

    nock('https://api.adviceslip.com').get('/advice/search/error').reply(500);
  });

  afterAll(() => {
    console.error.mockRestore();
    nock.cleanAll();
  });

  it('GET /advice/test returns advice for a valid word', async () => {
    const { statusCode, body } = await request(app).get('/advice/test');
    expect(statusCode).toBe(200);
    expect(body).toHaveProperty('advice');
    expect(body.advice).toBe('Test advice for the word "test".');
  });

  it('GET /advice/empty returns 404 error when no advice is found', async () => {
    const { statusCode, body } = await request(app).get('/advice/empty');
    expect(statusCode).toBe(404);
    expect(body).toHaveProperty('error', 'No advice found for the input word.');
  });

  it('GET /advice/error handles external API failure and returns 500 error', async () => {
    const { statusCode, body } = await request(app).get('/advice/error');
    expect(statusCode).toBe(500);
    expect(body).toHaveProperty('error', 'An internal server error occurred.');
  });

  it('GET /advice/test returns random advice from a list if multiple advices are available', async () => {
    nock('https://api.adviceslip.com')
      .get('/advice/search/complex')
      .reply(200, {
        slips: [
          { id: 1, advice: 'First advice' },
          { id: 2, advice: 'Second advice' },
          { id: 3, advice: 'Third advice' },
        ],
      });

    const { statusCode, body } = await request(app).get('/advice/complex');
    expect(statusCode).toBe(200);
    expect(body).toHaveProperty('advice');
    expect(['First advice', 'Second advice', 'Third advice']).toContain(
      body.advice,
    );
  });
});
