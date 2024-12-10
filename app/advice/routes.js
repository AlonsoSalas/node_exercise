import express from 'express';
import { getAdvice } from './controllers';

const router = express.Router();

/**
 * @swagger
 * /advice/{word}:
 *   get:
 *     summary: Get advice by keyword
 *     description: Fetch a random piece of advice based on the input keyword.
 *     parameters:
 *       - in: path
 *         name: word
 *         required: true
 *         description: The keyword to search for advice.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A piece of advice.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 advice:
 *                   type: string
 *       400:
 *         description: Bad request if no word is provided.
 *       404:
 *         description: No advice found for the input word.
 *       500:
 *         description: Internal server error.
 */
router.get('/:word', getAdvice);

export default router;
