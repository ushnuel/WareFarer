/* eslint-disable camelcase */
import DB from '../DB';

class TripModel {
  static async create({
    bus_id, origin, destination, fare, trip_date,
  }) {
    const query = `
    INSERT INTO trips(
      bus_id,
      origin,
      destination,
      fare,
      trip_date
    )
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *
    `;
    const params = [bus_id, origin, destination, fare, trip_date];
    const trip = await DB.query(query, params);
    return trip;
  }

  static async cancel({ id }) {
    const query = `
    DELETE FROM trips
      WHERE
        id = $1
    `;

    const param = [id];
    const trip = await DB.query(query, param);
    return trip;
  }

  static async getAll() {
    const query = 'SELECT * FROM trips';
    const trips = await DB.query(query, '', true);
    return trips;
  }
}

export default TripModel;
