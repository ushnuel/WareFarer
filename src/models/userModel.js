/* eslint-disable camelcase */
import bcrypt from 'bcrypt';
import DB from '../DB';
import { ErrorHandler } from '../Handlers';

class UserModel {
  static async create({
    email, first_name, last_name, password,
  }) {
    if (!(email && password)) {
      throw new ErrorHandler('Enter email and password');
    }
    const is_admin = true;
    const query = `
    INSERT INTO users (
      email,
      first_name,
      last_name,
      password,
      is_admin
    )
    VALUES($1,$2,$3,$4,$5)
      RETURNING *
    `;

    const hashedPassword = await bcrypt.hash(password, 15);
    const params = [email, first_name, last_name, hashedPassword, is_admin];
    const user = await DB.query(query, params);
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
    const user = await DB.query(query, param);
    if (!user) {
      throw new ErrorHandler('incorrect username or password');
    }
    const isPassword = bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw new ErrorHandler('incorrect username or password');
    }
    return UserModel.exclude(user);
  }

  static async emailExist(email) {
    const query = `
    SELECT * FROM users
      WHERE 
        email = $1
    `;
    const param = [email];
    const user = await DB.query(query, param);
    if (user) {
      throw new ErrorHandler('Email already exists', 401);
    }
    return user;
  }

  static exclude({ password, ...otherColumns }) {
    return otherColumns;
  }
}

export default UserModel;
