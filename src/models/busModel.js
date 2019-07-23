/* eslint-disable camelcase */
import DB from '../DB';
import { ErrorHandler } from '../Handlers';

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
    const bus = await DB.query(query, params).catch((err) => {
      throw new ErrorHandler(err.message, 400);
    });
    return bus;
  }

  static async get({ bus_id }) {
    const query = `
    SELECT * FROM buses
     WHERE id = $1;`;
    const param = [bus_id];
    const bus = await DB.query(query, param);
    if (!bus) {
      throw new ErrorHandler(`Bus with id ${bus_id} not found`, 404);
    }
    return bus;
  }
}

export default BusModel;
