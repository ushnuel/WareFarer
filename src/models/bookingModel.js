/* eslint-disable camelcase */
import DB from '../DB';
import { ErrorHandler } from '../Handlers';

export default class BookingModel {
  static async create(user_id, {
    trip_id, bus_id, trip_date, seat_number,
  }) {
    const query = `
    INSERT INTO bookings(
     user_id,
     trip_id,
     bus_id,
     seat_number,
     trip_date
   ) 
   VALUES ($1,$2,$3,$4,$5)
    RETURNING *;
    `;
    const params = [user_id, trip_id, bus_id, seat_number, trip_date];
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

  static async delete(id) {
    if (!id) {
      throw new ErrorHandler('Invalid id', 404);
    }
    const query = `
    DELETE FROM bookings
      WHERE id = $1`;
    const param = [id];
    const booking = await DB.query(query, param).catch(() => {
      throw new ErrorHandler('Resources not found', 404);
    });
    return booking;
  }

  static async get(id) {
    const query = `
    SELECT * FROM bookings
      WHERE id = $1;`;
    const param = [id];
    const booking = await DB.query(query, param);
    if (!booking) {
      throw new ErrorHandler(`Error! Booking with id ${id} not found`, 404);
    }
    return booking;
  }

  static async updateSeat(id, user_id, { seat_number }) {
    const query = `
    UPDATE bookings
      SET seat_number = $1
        WHERE id = $2 AND user_id = $3
        RETURNING *;`;
    const param = [seat_number, id, user_id];
    const booking = DB.query(query, param).catch(() => {
      throw new ErrorHandler('Forbidden access', 403);
    });
    return booking;
  }
}
