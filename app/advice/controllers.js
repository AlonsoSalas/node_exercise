import { fetchAdviceFromApi, saveAdviceToDb } from './services';

/**
 * Controller to handle advice requests based on a keyword.
 *
 * @async
 * @function getAdvice
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Returns a response with the advice or an error message.
 */
export const getAdvice = async (req, res) => {
  const { word } = req.params;

  try {
    const adviceList = await fetchAdviceFromApi(word);

    if (adviceList.length === 0) {
      return res
        .status(404)
        .json({ error: 'No advice found for the input word.' });
    }

    const selectedAdvice =
      adviceList[Math.floor(Math.random() * adviceList.length)];

    await saveAdviceToDb(selectedAdvice.id, word, selectedAdvice.advice);

    return res.json({ advice: selectedAdvice.advice });
  } catch (error) {
    console.error(`Error in getAdvice controller: ${error.message}`);
    return res
      .status(500)
      .json({ error: 'An internal server error occurred.' });
  }
};
