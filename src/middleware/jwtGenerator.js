import jwt from 'jsonwebtoken';
import config from '../config';
import { ErrorHandler } from '../Handlers';

const signInOptions = {
  expiresIn: '8h',
  algorithm: 'RS256',
};

class jwtGenerator {
  static generateToken(payload) {
    return jwt.sign(payload, config.PRIVATE_KEY, signInOptions);
  }

  static authorize(req, res, next) {
    try {
      const header = req.headers.authorization.split(' ');
      const bearer = header[0];
      const jwtToken = header[1];
      if (header.length !== 2 && bearer !== 'Bearer') {
        throw new ErrorHandler(
          'The request header should start with Bearer and then the token',
          401,
        );
      }
      if (jwtToken) {
        jwt.verify(jwtToken, config.PUBLIC_KEY, (err, decoded) => {
          if (err) {
            throw new ErrorHandler('Authentication failed: Invalid token', 401);
          }
          req.user = decoded;

          next();
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static authorizeAdmin(req, res, next) {
    if (!req.user.isAdmin) {
      next(new ErrorHandler('Forbidden access!', 403));
    } else {
      next();
    }
  }
}

export default jwtGenerator;
