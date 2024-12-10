import { fetchAdviceFromApi, saveAdviceToDb } from '../../app/advice/services';
import { insertAdvice } from '../../app/advice/model';
import { setupMockApi, resetMocks } from './helpers/mockSetup';

jest.mock('../../app/advice/model');

describe('Advice Service', () => {
  beforeEach(() => {
    setupMockApi('https://api.adviceslip.com', '/advice/search/test', {
      slips: [{ id: 1, advice: 'Test advice' }],
    });
  });

  afterEach(() => {
    resetMocks();
    jest.clearAllMocks();
  });

  describe('fetchAdviceFromApi', () => {
    it('fetches advice successfully', async () => {
      const advice = await fetchAdviceFromApi('test');
      expect(advice).toEqual([{ id: 1, advice: 'Test advice' }]);
    });

    it('returns an empty array if no advice found', async () => {
      setupMockApi('https://api.adviceslip.com', '/advice/search/empty', { slips: [] });
      const advice = await fetchAdviceFromApi('empty');
      expect(advice).toEqual([]);
    });

    it('throws an error when the API request fails', async () => {
      setupMockApi('https://api.adviceslip.com', '/advice/search/test', 500);
      try {
        await fetchAdviceFromApi('test');
      } catch (error) {
        expect(error.message).toBe('Failed to fetch advice from the external API.');
      }
    });
  });

  describe('saveAdviceToDb', () => {
    it('saves advice to the database successfully', async () => {
      const mockAdvice = { id: 1, query: 'test', advice: 'Test advice' };
      insertAdvice.mockResolvedValue(mockAdvice);

      const savedAdvice = await saveAdviceToDb(1, 'test', 'Test advice');
      expect(savedAdvice).toEqual(mockAdvice);
      expect(insertAdvice).toHaveBeenCalledWith({ api_id: 1, query: 'test', advice: 'Test advice' });
    });

    it('throws an error if saving advice to the database fails', async () => {
      insertAdvice.mockRejectedValue(new Error('Database error'));

      try {
        await saveAdviceToDb(1, 'test', 'Test advice');
      } catch (error) {
        expect(error.message).toBe('Failed to save advice to the database.');
      }
    });
  });
});
