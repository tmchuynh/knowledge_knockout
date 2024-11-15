import express from 'express';
import { getProgress, updateProgress } from '../controllers/progressController';

const router = express.Router();

router.get( '/:userId', getProgress );
router.put( '/:userId/update', updateProgress );

export default router;
