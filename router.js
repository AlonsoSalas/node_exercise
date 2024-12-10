import express from 'express';
import adviceRoutes from './app/advice/routes';

const router = express.Router();

router.get('/', (req, res) => res.send('ADVICE API IS ONLINE!'));
router.use('/advice', adviceRoutes);

export default router;
