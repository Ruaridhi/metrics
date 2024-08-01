import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Export the environment variables
export default {
  status: process.env.STATUS,
  devPort: process.env.DEV_PORT,
  prodPort: process.env.PROD_PORT,
  db: {
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    port: process.env.DB_PORT || 8081, // Default to 8081 if DB_PORT is not set
    host: 'localhost', // Assuming the database is hosted locally
  },
};
