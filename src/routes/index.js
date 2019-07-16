import express from 'express';
import authRoute from './userAuthRoutes';
import tripRoute from './tripRoutes';
import busRoute from './busRoutes';
import bookingRoute from './bookingRoutes';
import jwtGenerator from '../middleware/jwtGenerator';

const router = express.Router();
router.use('/api/v1/auth', authRoute);
router.use('/api/v1/trips', jwtGenerator.authorize, jwtGenerator.authorizeAdmin, tripRoute);
router.use('/api/v1/bus', jwtGenerator.authorize, jwtGenerator.authorizeAdmin, busRoute);
router.use('/api/v1/bookings', jwtGenerator.authorize, jwtGenerator.authorizeAdmin, bookingRoute);

export default router;
