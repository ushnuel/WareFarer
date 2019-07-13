import express from 'express';
import BookingController from '../controllers/bookingController';

const router = express.Router();

router.post('/', BookingController.create);
router.get('/', BookingController.get);
router.delete('/:bookingId/delete', BookingController.delete);
router.patch('/:bookingId/edit/seat_number', BookingController.changeSeat);
export default router;
