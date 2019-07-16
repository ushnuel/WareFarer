import express from 'express';
import BookingController from '../controllers/bookingController';

const router = express.Router();

router.post('', BookingController.create);
router.get('', BookingController.get);
router.delete('/:bookingId', BookingController.delete);
router.patch('/:bookingId', BookingController.changeSeat);
export default router;
