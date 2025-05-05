import { Pglite } from 'pglite';

const db = new Pglite('patients.db', { mode: 'persistent' });

await db.exec(`
  CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER,
    gender TEXT
  );
`);

export default db;
