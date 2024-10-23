const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// create a pool for managing connections
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Export the pool to use in other parts of the app
module.exports = pool;