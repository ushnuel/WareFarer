/* eslint-disable camelcase */
import bcrypt from 'bcrypt';
import DB from '../DB';
import { ErrorHandler } from '../Handlers';

class UserModel {
  static async create({
    email, password, first_name, last_name, is_admin
  }) {
    const query = `
    INSERT INTO users (
      email,
      password,
      first_name,
      last_name,
      is_admin
    )
    VALUES($1,$2,$3,$4,$5)
      RETURNING *
    `;

    const hashedPassword = await bcrypt.hash(password, 15);
    const params = [email, hashedPassword, first_name, last_name, is_admin];
    const user = await DB.query(query, params).catch((err) => {
      throw new ErrorHandler(err.message, 400);
    });
    return UserModel.exclude(user);
  }

  static async getUserById(id) {
    const query = `
      SELECT * FROM users
        WHERE 
          id = $1
    `;
    const param = [id];
    const user = await DB.query(query, param);
    return UserModel.exclude(user);
  }

  static async getUserByEmail({ email, password }) {
    // sign in method
    const query = `
    SELECT * FROM users
      WHERE
        email = $1`;

    const param = [email];
    const user = await DB.query(query, param).catch(() => {
      throw new ErrorHandler('User not found', 404);
    });
    if (!user) {
      throw new ErrorHandler('incorrect username or password', 404);
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw new ErrorHandler('incorrect username or password', 400);
    }
    return UserModel.exclude(user);
  }

  static async checkEmail({ email }) {
    const query = `
    SELECT * FROM users
      WHERE 
        email = $1
    `;
    const param = [email];
    const user = await DB.query(query, param);
    if (user) {
      throw new ErrorHandler('Email already exists', 400);
    }
    return user;
  }

  static exclude({ password, ...otherColumns }) {
    return otherColumns;
  }
}

export default UserModel;
