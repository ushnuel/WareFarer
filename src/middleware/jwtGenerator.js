import jwt from 'jsonwebtoken';
import fs from 'fs';
import { ErrorHandler } from '../Handlers';

const privateKey = fs.readFileSync('./pvt.key', 'utf8');
const publicKey = fs.readFileSync('./pub.key', 'utf8');
const signInOptions = {
  expiresIn: '8h',
  algorithm: 'RS256',
};

class jwtGenerator {
  static generateToken(payload) {
    return jwt.sign(payload, privateKey, signInOptions);
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
        jwt.verify(jwtToken, publicKey, (err, decoded) => {
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
}

export default jwtGenerator;
