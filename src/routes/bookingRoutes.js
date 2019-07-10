import express from 'express';
import BookingController from '../controllers/bookingController';

const router = express.Router();

router.post('/bookings', BookingController.create);
router.get('/bookings', BookingController.get);
router.delete('/bookings/:bookingId', BookingController.delete);
export default router;
