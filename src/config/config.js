import "dotenv/config";

export default {
  development: {
    username: process.env.DATABASE_USER || "postgres",
    password: process.env.DATABASE_PASSWORD || "",
    database: process.env.DATABASE_NAME || "postgres",
    host: process.env.DATABASE_HOST || "localhost",
    dialect: process.env.DATABASE_DIALECT || "postgres",
  },
  test: {
    username: process.env.DB_TEST_USERNAME || "root",
    password: process.env.DB_TEST_PASSWORD || null,
    database: process.env.DB_TEST_DATABASE || "database_test",
    host: process.env.DB_TEST_HOST || "127.0.0.1",
    dialect: process.env.DB_TEST_DIALECT || "mysql",
  },
  production: {
    username: process.env.DB_PROD_USERNAME || "username",
    password: process.env.DB_PROD_PASSWORD || "password",
    database: process.env.DB_PROD_DATABASE || "database",
    host: process.env.DB_PROD_HOST || "host",
    dialect: process.env.DB_PROD_DIALECT || "postgres",
  },
};
