const { app } = require('electron').remote;
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(require('path').join(app.getPath('userData'), 'db.json'));
const db = require('lowdb')(adapter);

if (!db.has('feeds').value()) {
  db.defaults({ feeds: [] }).write();
}

if (!db.has('settings').value()) {
  db.defaults({ settings: {} }).write();
}

export default db;
