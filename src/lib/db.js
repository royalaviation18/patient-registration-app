import { PGlite } from '@electric-sql/pglite';

const db = new PGlite('idb://my-pgdata');

export async function initDB() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER,
      gender TEXT
    );
  `);
}

export default db;
