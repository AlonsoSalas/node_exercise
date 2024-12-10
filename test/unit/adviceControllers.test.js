import { getAdvice } from '../../app/advice/controllers';
import { fetchAdviceFromApi, saveAdviceToDb } from '../../app/advice/services';

jest.mock('../../app/advice/services', () => ({
  fetchAdviceFromApi: jest.fn(),
  saveAdviceToDb: jest.fn(),
}));

describe('getAdvice Controller', () => {
  let req;
  let res;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
   console.error.mockRestore();
  });

  beforeEach(() => {
    req = {
      params: {
        word: 'test',
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it('should return 404 if no advice is found for the input word', async () => {
    req.params.word = 'test';
    fetchAdviceFromApi.mockResolvedValue([]);

    await getAdvice(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'No advice found for the input word.' });
  });

  it('should return advice if advice is found and save it to DB', async () => {
    const mockAdvice = { id: 1, advice: 'Test advice' };
    req.params.word = 'test';
    fetchAdviceFromApi.mockResolvedValue([mockAdvice]);

    await getAdvice(req, res);

    expect(res.json).toHaveBeenCalledWith({ advice: 'Test advice' });
    expect(saveAdviceToDb).toHaveBeenCalledWith(1, 'test', 'Test advice');
  });

  it('should handle errors gracefully and return 500', async () => {
    req.params.word = 'test';
    fetchAdviceFromApi.mockRejectedValue(new Error('API error'));

    await getAdvice(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'An internal server error occurred.' });
  });
});
