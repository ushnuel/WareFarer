/* eslint-disable camelcase */
import DB from '../DB';
import { ErrorHandler } from '../Handlers';

export default class TripModel {
  static async create({
    bus_id, origin, destination, fare,
  }) {
    const created_on = new Date();
    const query = `
    INSERT INTO trips(
      bus_id,
      origin,
      destination,
      fare,
      created_on
    )
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *
    `;
    const params = [bus_id, origin, destination, fare, created_on];
    const trip = await DB.query(query, params);
    return trip;
  }

  static async cancel(id) {
    if (!id) {
      throw new ErrorHandler('No trip found', 404);
    }
    const query = `
    UPDATE trips
      SET status = 'cancelled'
      WHERE id = $1;
    `;
    const param = [id];
    const trip = await DB.query(query, param);
    return trip;
  }

  static async get(id) {
    if (!id) {
      throw new ErrorHandler('No trip found', 404);
    }
    const query = `
    SELECT * FROM trips
      WHERE id = $1
    `;
    const param = [id];
    const booking = await DB.query(query, param);
    if (!booking) {
      throw new ErrorHandler(`Fatal! No booking with id ${id} found`, 404);
    }
    return booking;
  }

  static async getAll() {
    const query = 'SELECT * FROM trips';
    const trips = await DB.query(query, '', true);
    if (!trips) {
      throw new ErrorHandler('No records found', 404);
    }
    return trips;
  }
}
