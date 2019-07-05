import { UserModel } from '../models';
import { feedbackHandler } from '../Handlers';
import jwtGenerator from '../middleware/jwtGenerator';

class userController {
  static async signUp(req, res, next) {
    try {
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
