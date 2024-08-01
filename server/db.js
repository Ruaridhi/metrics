import pkg from 'pg';
import config from './config.js';

const { Pool } = pkg;

const pool = new Pool({
  user: config.db.user,
  password: config.db.password,
  host: config.db.host,
  port: 8080, // wasn't working with 5432 on my machine
  database: config.db.database,
});

// Function to query the database
const query = (text, params) => {
  return pool.query(text, params);
};

// Export the pool and query function
export default { pool, query };
