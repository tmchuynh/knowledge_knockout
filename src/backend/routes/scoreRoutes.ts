import express from 'express';
import { getScore, createScore, updateScore } from '../controllers/scoreController';

const router = express.Router();

router.get( '/:userId', getScore );
router.post( '/create', createScore );
router.put( '/:scoreId/update', updateScore );

export default router;
