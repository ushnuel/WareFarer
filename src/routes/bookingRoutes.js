import express from 'express';
import BookingController from '../controllers/bookingController';
import { Validation } from '../middleware';

const router = express.Router();

router.post('/', Validation.bookingValidator('create'), BookingController.create);
router.get('/', BookingController.get);
router.delete('/:bookingId', BookingController.delete);
router.patch('/:bookingId', Validation.bookingValidator('changeSeat'), BookingController.changeSeat);
export default router;
