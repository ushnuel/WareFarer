/* eslint-disable camelcase */
import DB from '../DB';
import { ErrorHandler } from '../Handlers';

export default class BookingModel {
  static async create(user_id, { trip_id, bus_id, seat_number }) {
    const query = `
    INSERT INTO bookings(
     user_id,
     trip_id,
     bus_id,
     seat_number
   ) 
   VALUES ($1,$2,$3,$4)
    RETURNING *;
    `;
    const params = [user_id, trip_id, bus_id, seat_number];
    const booking = await DB.query(query, params);
    return booking;
  }

  static async getAll() {
    const query = `
    SELECT * from bookings
    `;
    const bookings = await DB.query(query, '', true);
    return bookings;
  }

  static async delete({ id }) {
    if (!id) {
      throw new ErrorHandler('Invalid id', 404);
    }
    const query = `
    DELETE FROM bookings
      WHERE id = $1
        ;`;
    const param = [id];
    const booking = await DB.query(query, param);
    return booking;
  }

  static async get(id) {
    const query = `
    SELECT * FROM bookings
      WHERE id = $1;
    `;
    const param = [id];
    const booking = await DB.query(query, param);
    if (!booking) {
      throw new ErrorHandler('fatal! Booking not found', 404);
    }
    return booking;
  }
}
