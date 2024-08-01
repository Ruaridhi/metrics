// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      port: 8080,
      database: 'metrics',
      user: 'admin',
      password: 'secret',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'metrics',
      user: 'admin',
      password: 'secret',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'metrics',
      user: 'admin',
      password: 'secret',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
