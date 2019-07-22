import { validationResult } from 'express-validator';
import { UserModel } from '../models';
import { feedbackHandler, validationError } from '../Handlers';
import { jwtGenerator } from '../middleware';

class userController {
  static async signUp(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        validationError(errors.errors);
      }
      await UserModel.checkEmail(req.body);
      const user = await UserModel.create(req.body);
      const token = await jwtGenerator.generateToken({
        id: user.id,
        email: user.email,
        isAdmin: user.is_admin,
      });
      const data = { token, ...user };
      feedbackHandler.message(res, data, 201);
    } catch (error) {
      next(error);
    }
  }

  static async signIn(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        validationError(errors.errors);
      }
      const user = await UserModel.getUserByEmail(req.body);
      const token = await jwtGenerator.generateToken({
        id: user.id,
        email: user.email,
        isAdmin: user.is_admin,
      });
      const data = { token, ...user };
      feedbackHandler.message(res, data, 200);
    } catch (error) {
      next(error);
    }
  }
}

export default userController;
