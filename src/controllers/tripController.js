import { TripModel } from '../models';
import { feedbackHandler } from '../Handlers';

export default class tripController {
  static async create(req, res, next) {
    try {
      const trip = await TripModel.create(req.body);
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
