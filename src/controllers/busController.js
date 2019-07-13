import { feedbackHandler, ErrorHandler } from '../Handlers';
import BusModel from '../models/busModel';

class busController {
  static async create(req, res, next) {
    try {
      if (!req.user.id) {
        throw new ErrorHandler('Bad request', 404);
      }
      const bus = await BusModel.create(req.user.id, req.body);
      const data = { ...bus };
      feedbackHandler.message(res, data, 201);
    } catch (error) {
      next(error);
    }
  }
}

export default busController;
