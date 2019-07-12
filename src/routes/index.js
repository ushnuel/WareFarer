import express from 'express';
import authRoute from './userAuthRoutes';
import tripRoute from './tripRoutes';
import busRoute from './busRoutes';
import bookingRoute from './bookingRoutes';
import jwtGenerator from '../middleware/jwtGenerator';

const router = express.Router();
router.use('/auth', authRoute);
router.use('/trips', jwtGenerator.authorize, tripRoute);
router.use('/bus', jwtGenerator.authorize, busRoute);
router.use('/bookings', jwtGenerator.authorize, bookingRoute);

export default router;
