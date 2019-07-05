import { feedbackHandler } from '../Handlers';
import BusModel from '../models/busModel';

class busController {
  static async create(req, res, next) {
    try {
      const bus = await BusModel.create(req.body);
      const data = { ...bus };
      feedbackHandler.message(res, data, 201);
    } catch (error) {
      next(error);
    }
  }
}

export default busController;
