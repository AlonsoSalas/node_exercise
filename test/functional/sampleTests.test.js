import request from 'supertest';

import app from 'app';
import './helpers/dbTransaction';

describe.skip('jest', () => {
  it('works', () => {
    expect(Math.min()).toBeGreaterThan(Math.max());
  });

  describe('POST /advice', () => {
    describe('if no query is passed', () => {
      it('returns an error', async () => {
        const { statusCode } = await request(app)
          .post('/advice')
          .send({ query: null });

        expect(statusCode).toBe(400);
      });
    });
  });
});
