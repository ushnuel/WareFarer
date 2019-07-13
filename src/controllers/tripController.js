import { TripModel } from '../models';
import { feedbackHandler, ErrorHandler } from '../Handlers';

export default class tripController {
  static async create(req, res, next) {
    try {
      if (!req.body.bus_id) {
        throw new ErrorHandler('No bus selected', 400);
      }
      const trip = await TripModel.create(req.user.id, req.body);
      const data = { ...trip };
      feedbackHandler.message(res, data, 201);
    } catch (error) {
      next(error);
    }
  }

  static async cancel(req, res, next) {
    try {
      await TripModel.cancel(req.params.tripId);
      const data = 'Trip cancelled successfully';
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
