const Pool = require("pg").Pool;

require("dotenv").config();

const pool = new Pool({
    user: `${process.env.DATABASE_USER}`,
    host: "localhost",
    database: "teach-me",
    password: `${process.env.DATABASE_PASSWORD}`,
    port: 5432,
});

module.exports = pool;