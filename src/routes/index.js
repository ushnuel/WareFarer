import express from 'express';
import authRoute from './userAuthRoutes';
import tripRoute from './tripRoutes';
import busRoute from './busRoutes';
import bookingRoute from './bookingRoutes';
import jwtGenerator from '../middleware/jwtGenerator';

const router = express.Router();
router.use('/api/v1/auth', authRoute);
router.use('/api/v1/trips', jwtGenerator.authorize, tripRoute);
router.use('/api/v1/bus', jwtGenerator.authorize, busRoute);
router.use('/api/v1/bookings', jwtGenerator.authorize, bookingRoute);

export default router;
