// Update with your config settings.
const pgConnection = {
  prod:
    process.env.DATABASE_URL ||
    "postgresql://postgresql@localhost/replate-prod",
  staging:
    process.env.DATABASE_URL ||
    "postgresql://postgresql@localhost/replate-staging",
};

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/replate-devlopment.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
      tableName: "dbmigrations",
    },
    seeds: { directory: "./database/seeds" },
  },

  staging: {
    client: "pg",
    connection: pgConnection.staging,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./database/migrations",
      tableName: "dbmigrations",
    },
    seeds: { directory: "./database/seeds" },
  },

  production: {
    client: "pg",
    connection: pgConnection.prod,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./database/migrations",
      tableName: "dbmigrations",
    },
    seeds: { directory: "./database/seeds" },
  },
};
