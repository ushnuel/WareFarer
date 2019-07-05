/* eslint-disable camelcase */
import DB from '../DB';

class BusModel {
  static async create({
    model, manufacturer, year, number_plate, capacity,
  }) {
    const query = `
      INSERT INTO buses (
        model,
        manufacturer,
        year,
        number_plate,
        capacity
      ) 
      VALUES ($1,$2,$3,$4,$5) RETURNING *
    `;
    const params = [model, manufacturer, year, number_plate, capacity];
    const bus = await DB.query(query, params);
    return bus;
  }
}

export default BusModel;
