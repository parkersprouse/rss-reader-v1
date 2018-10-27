const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = lowdb(adapter);

if (!db.has('feeds').value()) {
  db.defaults({ feeds: [] }).write();
}

if (!db.has('settings').value()) {
  db.defaults({ settings: {} }).write();
}

export default db;
