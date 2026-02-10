import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
});

export const query = (text, params) => {
    return pool.query(text, params);
};
