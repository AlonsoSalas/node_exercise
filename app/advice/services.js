import axios from 'axios';
import { insertAdvice } from './model';

const ADVICE_API_URL = 'https://api.adviceslip.com/advice/search';

/**
 * Fetches advice from the external API based on a given keyword.
 *
 * @async
 * @function fetchAdviceFromApi
 * @param {string} keyword - The word to search for in the advice API.
 * @returns {Promise<Array<{id: number, advice: string}>>} - A promise that resolves to a list of advice objects,
 * each containing an `id` and `advice` text. Returns an empty array if no advice is found.
 * @throws {Error} - Throws an error if the API request fails or an unexpected error occurs.
 */
export const fetchAdviceFromApi = async (keyword) => {
  try {
    const { data } = await axios.get(`${ADVICE_API_URL}/${keyword}`);
    return data.slips?.map(({ id, advice }) => ({ id, advice })) || [];
  } catch (error) {
    console.error(`Error fetching advice from API: ${error.message}`);
    throw new Error('Failed to fetch advice from the external API.');
  }
};

/**
 * Saves advice to the database.
 *
 * @async
 * @function saveAdviceToDb
 * @param {number} api_id - The ID of the advice from the external API.
 * @param {string} query - The keyword used to fetch the advice.
 * @param {string} advice - The advice text to save.
 * @returns {Promise<Object>} - The saved advice object.
 * @throws {Error} - Throws an error if saving the advice to the database fails.
 */
export const saveAdviceToDb = async (api_id, query, advice) => {
  try {
    return await insertAdvice({ api_id, query, advice });
  } catch (error) {
    console.error(`Error saving advice to database: ${error.message}`);
    throw new Error('Failed to save advice to the database.');
  }
};
