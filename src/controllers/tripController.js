import { validationResult } from 'express-validator';
import { TripModel, BusModel } from '../models';
import { feedbackHandler, validationError } from '../Handlers';

export default class tripController {
  static async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        validationError(errors.errors);
      }
      await BusModel.get(req.body);
      const trip = await TripModel.create(req.user.id, req.body);
      const data = { ...trip };
      feedbackHandler.message(res, data, 201);
    } catch (error) {
      next(error);
    }
  }

  static async cancel(req, res, next) {
    try {
      await TripModel.get(req.params.tripId);
      await TripModel.cancel(req.params.tripId);
      const message = 'Trip cancelled successfully';
      const data = { message };
      feedbackHandler.message(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const trips = await TripModel.getAll(req.query);
      const data = [...trips];
      feedbackHandler.message(res, data);
    } catch (error) {
      next(error);
    }
  }
}
