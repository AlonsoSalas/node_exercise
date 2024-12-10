import axios from 'axios';
import { insertAdvice } from './model';

const ADVICE_API_URL = 'https://api.adviceslip.com/advice/search';

export const fetchAdviceFromApi = async (keyword) => {
  try {
    const { data } = await axios.get(`${ADVICE_API_URL}/${keyword}`);
    return data.slips?.map(({ id, advice }) => ({ id, advice })) || [];
  } catch (error) {
    console.error(`Error fetching advice from API: ${error.message}`);
    throw new Error('Failed to fetch advice from the external API.');
  }
};

export const saveAdviceToDb = async (api_id, query, advice) => {
  try {
    return await insertAdvice({ api_id, query, advice });
  } catch (error) {
    console.error(`Error saving advice to database: ${error.message}`);
    throw new Error('Failed to save advice to the database.');
  }
};
