import { TripModel } from '../models';
import { feedbackHandler, ErrorHandler } from '../Handlers';

class tripController {
  static async create(req, res, next) {
    try {
      if (!req.user.isAdmin) {
        throw new ErrorHandler('Forbidden access', 403);
      }
      const trip = await TripModel.create(req.body);
      const data = { ...trip };
      feedbackHandler.message(res, data, 201);
    } catch (error) {
      next(error);
    }
  }

  static cancel(req, res, next) {
    try {
      if (!req.user.isAdmin) {
        throw new ErrorHandler('Forbidden access', 403);
      }
      const trip = TripModel.cancel(req.body.id);
      feedbackHandler.message(res, trip);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const trips = await TripModel.getAll(req.query);
      const data = [...trips];
      feedbackHandler.message(res, data, 200);
    } catch (error) {
      next(error);
    }
  }
}

export default tripController;
