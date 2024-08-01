import db from './db.js';

export const queryLogsPerDay = async () => {
  return await db.query(`
    select name, date(timestamp), count(*) 
    from logs 
    group by date(timestamp), name 
    order by name, date(timestamp);
  `);
};

export const queryLogsPerHour = async () => {
  return await db.query(`
    SELECT name, DATE_TRUNC('hour', timestamp) AS date, COUNT(*)
    FROM logs
    GROUP BY DATE_TRUNC('hour', timestamp), name
    ORDER BY name, DATE_TRUNC('hour', timestamp);
  `);
};

export const queryLogsPerMinute = async () => {
  return await db.query(`
    SELECT name, DATE_TRUNC('minute', timestamp) AS date, COUNT(*)
    FROM logs
    GROUP BY DATE_TRUNC('minute', timestamp), name
    ORDER BY name, DATE_TRUNC('minute', timestamp);
  `);
};

export const addLog = async (id, timestamp, name, value) => {
  const query =
    'INSERT into logs (id, timestamp, name, value) VALUES($1, $2, $3, $4) RETURNING *';
  const values = [id, timestamp, name, value];

  return await db.query(query, values);
};
