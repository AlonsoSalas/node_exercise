import express from 'express';
import { getAdvice } from './controllers';

const router = express.Router();

router.get('/:word', getAdvice);

export default router;
