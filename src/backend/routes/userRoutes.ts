import express from 'express';
import { getUser, updateUser } from '../controllers/userController';

const router = express.Router();

router.get( '/profile', getUser );
router.put( '/update', updateUser );

export default router;
