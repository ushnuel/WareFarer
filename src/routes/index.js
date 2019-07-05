import express from 'express';
import authRoute from './userAuthRoutes';
import tripRoute from './tripRoutes';
import busRoute from './busRoutes';
import jwtGenerator from '../middleware/jwtGenerator';

const router = express.Router();
router.use('/auth', authRoute);
router.use('', jwtGenerator.authorize, tripRoute);
router.use('', jwtGenerator.authorize, busRoute);

export default router;
