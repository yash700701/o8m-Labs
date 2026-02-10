import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import pkg from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

const { Pool } = pkg;

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing. Check backend/.env");
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export const query = (text, params) => {
    return pool.query(text, params);
};
