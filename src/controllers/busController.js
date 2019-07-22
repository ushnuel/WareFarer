import { validationResult } from 'express-validator';
import { feedbackHandler, validationError } from '../Handlers';
import BusModel from '../models/busModel';

class busController {
  static async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        validationError(errors.errors);
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
