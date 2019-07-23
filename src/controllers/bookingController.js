import { validationResult } from 'express-validator';
import { BookingModel, BusModel, TripModel } from '../models';
import { feedbackHandler, ErrorHandler, validationError } from '../Handlers';

export default class BookingController {
  static async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        validationError(errors.errors);
      }
      await BusModel.get(req.body);
      await TripModel.get(req.body.trip_id);
      const booking = await BookingModel.create(req.user.id, req.body);
      const data = { ...booking };
      feedbackHandler.message(res, data, 201);
    } catch (error) {
      next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const bookings = await BookingModel.getAll(req.user.id);
      const data = [...bookings];
      feedbackHandler.message(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const booking = await BookingModel.get(req.params.bookingId);
      if (booking.user_id !== req.user.id) {
        throw new ErrorHandler('Forbidden access', 403);
      }
      await BookingModel.delete(req.params.bookingId);
      const message = 'Booking deleted successfully';
      const data = { message };
      feedbackHandler.message(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async changeSeat(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        validationError(errors.errors);
      }
      const booking = await BookingModel.updateSeat(req.params.bookingId, req.user.id, req.body);
      const data = { ...booking };
      feedbackHandler.message(res, data);
    } catch (error) {
      next(error);
    }
  }
}
