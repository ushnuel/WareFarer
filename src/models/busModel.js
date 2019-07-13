/* eslint-disable camelcase */
import DB from '../DB';

class BusModel {
  static async create(user_id, {
    model, manufacturer, year, number_plate, capacity,
  }) {
    const query = `
      INSERT INTO buses (
        user_id,
        model,
        manufacturer,
        year,
        number_plate,
        capacity
      ) 
      VALUES ($1,$2,$3,$4,$5,$6) RETURNING *
    `;
    const params = [user_id, model, manufacturer, year, number_plate, capacity];
    const bus = await DB.query(query, params);
    return bus;
  }
}

export default BusModel;
