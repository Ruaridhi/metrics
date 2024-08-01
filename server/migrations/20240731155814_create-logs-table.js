const { v4: uuidv4 } = require('uuid');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  // Define all rows to insert
  const rows = [
    {
      id: uuidv4(),
      name: 'error',
      timestamp: '2024-07-31 15:31:00+00',
      value: 'error msg',
    },
    {
      id: uuidv4(),
      name: 'error',
      timestamp: '2024-07-31 15:31:00+00',
      value: 'error msg',
    },
    {
      id: uuidv4(),
      name: 'error',
      timestamp: '2024-07-31 15:31:00+00',
      value: 'error msg',
    },
    {
      id: uuidv4(),
      name: 'error',
      timestamp: '2024-07-31 15:31:00+00',
      value: 'error msg',
    },
    {
      id: uuidv4(),
      name: 'error',
      timestamp: '2024-07-31 15:31:00+00',
      value: 'error msg',
    },
    {
      id: uuidv4(),
      name: 'error',
      timestamp: '2024-07-31 15:01:00+00',
      value: 'error msg',
    },
    {
      id: uuidv4(),
      name: 'error',
      timestamp: '2024-07-31 15:01:00+00',
      value: 'error msg',
    },
    {
      id: uuidv4(),
      name: 'error',
      timestamp: '2024-07-31 15:01:00+00',
      value: 'error msg',
    },
    {
      id: uuidv4(),
      name: 'error',
      timestamp: '2024-07-31 15:01:00+00',
      value: 'error msg',
    },
    {
      id: uuidv4(),
      name: 'error',
      timestamp: '2024-07-30 15:01:00+00',
      value: 'error msg',
    },
    {
      id: uuidv4(),
      name: 'error',
      timestamp: '2024-07-30 15:12:00+00',
      value: 'error msg',
    },
    {
      id: uuidv4(),
      name: 'error',
      timestamp: '2024-07-30 15:12:00+00',
      value: 'error msg',
    },
    {
      id: uuidv4(),
      name: 'error',
      timestamp: '2024-07-30 15:12:00+00',
      value: 'error msg',
    },
    {
      id: uuidv4(),
      name: 'error',
      timestamp: '2024-07-30 15:12:00+00',
      value: 'error msg',
    },
    {
      id: uuidv4(),
      name: 'error',
      timestamp: '2024-07-30 15:12:00+00',
      value: 'error msg',
    },
    {
      id: uuidv4(),
      name: 'error',
      timestamp: '2024-07-30 15:12:00+00',
      value: 'error msg',
    },
    {
      id: uuidv4(),
      name: 'warning',
      timestamp: '2024-07-31 15:16:00+00',
      value: 'warning msg',
    },
    {
      id: uuidv4(),
      name: 'warning',
      timestamp: '2024-07-31 15:16:00+00',
      value: 'warning msg',
    },
    {
      id: uuidv4(),
      name: 'warning',
      timestamp: '2024-07-31 15:16:00+00',
      value: 'warning msg',
    },
    {
      id: uuidv4(),
      name: 'warning',
      timestamp: '2024-07-31 15:16:00+00',
      value: 'warning msg',
    },
    {
      id: uuidv4(),
      name: 'warning',
      timestamp: '2024-07-31 15:16:00+00',
      value: 'warning msg',
    },
    {
      id: uuidv4(),
      name: 'warning',
      timestamp: '2024-07-31 15:16:00+00',
      value: 'warning msg',
    },
    {
      id: uuidv4(),
      name: 'warning',
      timestamp: '2024-07-31 15:07:00+00',
      value: 'warning msg',
    },
    {
      id: uuidv4(),
      name: 'warning',
      timestamp: '2024-07-31 15:07:00+00',
      value: 'warning msg',
    },
    {
      id: uuidv4(),
      name: 'warning',
      timestamp: '2024-07-31 15:07:00+00',
      value: 'warning msg',
    },
    {
      id: uuidv4(),
      name: 'warning',
      timestamp: '2024-07-31 15:07:00+00',
      value: 'warning msg',
    },
    {
      id: uuidv4(),
      name: 'warning',
      timestamp: '2024-07-30 15:07:00+00',
      value: 'warning msg',
    },
    {
      id: uuidv4(),
      name: 'warning',
      timestamp: '2024-07-30 15:04:00+00',
      value: 'warning msg',
    },
    {
      id: uuidv4(),
      name: 'warning',
      timestamp: '2024-07-30 15:04:00+00',
      value: 'warning msg',
    },
    {
      id: uuidv4(),
      name: 'warning',
      timestamp: '2024-07-30 15:04:00+00',
      value: 'warning msg',
    },
    {
      id: uuidv4(),
      name: 'warning',
      timestamp: '2024-07-30 15:04:00+00',
      value: 'warning msg',
    },
    {
      id: uuidv4(),
      name: 'warning',
      timestamp: '2024-07-30 15:04:00+00',
      value: 'warning msg',
    },
    {
      id: uuidv4(),
      name: 'log',
      timestamp: '2024-07-31 15:11:00+00',
      value: 'log msg',
    },
    {
      id: uuidv4(),
      name: 'log',
      timestamp: '2024-07-31 15:11:00+00',
      value: 'log msg',
    },
    {
      id: uuidv4(),
      name: 'log',
      timestamp: '2024-07-31 15:11:00+00',
      value: 'log msg',
    },
    {
      id: uuidv4(),
      name: 'log',
      timestamp: '2024-07-31 15:11:00+00',
      value: 'log msg',
    },
    {
      id: uuidv4(),
      name: 'log',
      timestamp: '2024-07-31 15:11:00+00',
      value: 'log msg',
    },
    {
      id: uuidv4(),
      name: 'log',
      timestamp: '2024-07-31 15:11:00+00',
      value: 'log msg',
    },
    {
      id: uuidv4(),
      name: 'log',
      timestamp: '2024-07-31 15:11:00+00',
      value: 'log msg',
    },
    {
      id: uuidv4(),
      name: 'log',
      timestamp: '2024-07-31 15:11:00+00',
      value: 'log msg',
    },
    {
      id: uuidv4(),
      name: 'log',
      timestamp: '2024-07-30 15:03:00+00',
      value: 'log msg',
    },
    {
      id: uuidv4(),
      name: 'log',
      timestamp: '2024-07-30 15:03:00+00',
      value: 'log msg',
    },
    {
      id: uuidv4(),
      name: 'log',
      timestamp: '2024-07-30 15:03:00+00',
      value: 'log msg',
    },
    {
      id: uuidv4(),
      name: 'log',
      timestamp: '2024-07-30 15:03:00+00',
      value: 'log msg',
    },
    {
      id: uuidv4(),
      name: 'log',
      timestamp: '2024-07-30 15:03:00+00',
      value: 'log msg',
    },
    {
      id: uuidv4(),
      name: 'log',
      timestamp: '2024-07-30 15:16:00+00',
      value: 'log msg',
    },
    {
      id: uuidv4(),
      name: 'log',
      timestamp: '2024-07-30 15:16:00+00',
      value: 'log msg',
    },
    {
      id: uuidv4(),
      name: 'log',
      timestamp: '2024-07-30 15:16:00+00',
      value: 'log msg',
    },
  ];

  // Build the SQL insert statement
  const sql = `
    CREATE TABLE IF NOT EXISTS logs (
      id UUID PRIMARY KEY,
      name VARCHAR(255),
      timestamp TIMESTAMPTZ,
      value VARCHAR(255)
    );

    INSERT INTO logs (id, name, timestamp, value) VALUES
    ${rows
      .map(
        (row) =>
          `('${row.id}', '${row.name}', '${row.timestamp}', '${row.value}')`
      )
      .join(',\n')}
  `;

  // Execute the SQL
  return knex.raw(sql);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.raw(`
      DROP TABLE logs;
    `);
};
