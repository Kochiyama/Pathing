const sqlite = require("sqlite3");
const db = new sqlite.Database("./src/database/database.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      username TEXT,
      hash TEXT
    );
  `, (err) => {
    if (err) {
      return console.log(err);
    }
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS paths (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      title TEXT,
      priority INTEGER,
      completion TEXT,
      steps TEXT
    );
  `, (err) => {
    if (err) {
      return console.log(err);
    }
  });
});

module.exports = db;