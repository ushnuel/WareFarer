import { Pool } from 'pg';
import config from '../config';

const pool = new Pool({
  connectionString: config.DB,
});

class DB {
  static async query(queryStream, params, anArray = false) {
    const oneLineQuery = this.removeNewlines(queryStream);
    const stream = await pool.query(oneLineQuery, params);
    return anArray ? stream.rows : stream.rows[0];
  }

  static removeNewlines(string) {
    return string.replace(/\n/g, '');
  }
}

export default DB;
