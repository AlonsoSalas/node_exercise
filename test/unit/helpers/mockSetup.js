import nock from 'nock';

export const setupMockApi = (baseUrl, endpoint, response) => {
  return nock(baseUrl).get(endpoint).reply(200, response);
};

export const resetMocks = () => {
  nock.cleanAll();
};
