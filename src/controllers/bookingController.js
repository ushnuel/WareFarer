import { BookingModel } from '../models';
import { feedbackHandler, ErrorHandler } from '../Handlers';

export default class BookingController {
  static async create(req, res, next) {
    try {
      const booking = await BookingModel.create(req.user.id, req.body);
      const data = { ...booking };
      feedbackHandler.message(res, data, 201);
    } catch (error) {
      next(error);
    }
  }

  static async get(req, res, next) {
    const { id, isAdmin } = req.user;
    try {
      const bookings = await BookingModel.getAll();
      bookings.forEach((booking) => {
        if (isAdmin === false && id !== booking.user_id) {
          throw new ErrorHandler('Forbidden access', 403);
        }
      });
      const data = [...bookings];
      feedbackHandler.message(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const booking = await BookingModel.get(req.params.bookingId);
      await BookingModel.delete(booking);
      const data = 'Booking deleted successfully';
      feedbackHandler.message(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async changeSeat(req, res, next) {
    try {
      const booking = await BookingModel.updateSeat(req.params.bookingId, req.user.id, req.body);
      const data = { ...booking };
      feedbackHandler.message(res, data);
    } catch (error) {
      next(error);
    }
  }
}
