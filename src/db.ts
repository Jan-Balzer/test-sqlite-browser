
export async function createDatabase(): Promise<any> {
const initSqlJsModule = await import('sql.js');
const SQL = await initSqlJsModule.default({
  locateFile: file => `/sql-wasm.wasm` // assuming it's in public/
});



try {
  const db = new SQL.Database();

  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      name TEXT,
      email TEXT
    );
  `);

  db.run('INSERT INTO users (name, email) VALUES (?, ?)', ['Alice', 'alice@example.com']);
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', ['Bob', 'bob@example.com']);
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', ['Charlie', 'charlie@example.com']);

  return db;

} catch (error) {
  console.error('Error creating database:', error);
  throw error;
}
}

export function getUsers(db: any): any[] {
  const stmt = db.prepare('SELECT * FROM users');
  const results: any[] = [];

  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }

  return results;
}
