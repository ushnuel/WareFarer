import express from 'express';
import userController from '../controllers/userController';
import { Validation } from '../middleware';

const router = express.Router();

router.post('/signup', Validation.userValidator('signUp'), userController.signUp);
router.post('/signin', Validation.userValidator('signIn'), userController.signIn);

export default router;
