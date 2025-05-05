import { PGlite } from '@electric-sql/pglite';

const db = new PGlite('idb://my-pgdata');

export async function initDB() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      dob TEXT,
      age INTEGER,
      gender TEXT,
      marital_status TEXT,
      phone TEXT,
      email TEXT,
      emergency_name TEXT,
      emergency_phone TEXT,
      emergency_relation TEXT
    );
  `);
}

export default db;
