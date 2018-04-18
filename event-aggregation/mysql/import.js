const mysql = require('mysql');
const fs = require('fs');
const datasetPath = "../../dataset/";


const events = JSON.parse(fs.readFileSync(datasetPath + 'events_.json', 'utf8'));
const users = JSON.parse(fs.readFileSync(datasetPath + 'users.json', 'utf8'));

const conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root!',
  database : 'wedb'
});

conn.connect();

(async function() {
  try {
    console.log("Importing...");

    let sql;

    console.log("types");
    sql = 'insert into we_event_types (name) values ("DEPLOY");';
    await run(sql);
    sql = 'insert into we_event_types (name) values ("STOP");';
    await run(sql);
    sql = 'insert into we_event_types (name) values ("START");';
    await run(sql);
    sql = 'insert into we_event_types (name) values ("REMOVE");';
    await run(sql);
    sql = 'insert into we_event_types (name) values ("CREATE");';
    await run(sql);

    console.log("users");
    for (let user of users) {

      sql = 'insert into we_users (email, name, surname, age, password) values (' +
        '"' + user.email + '",' +
        '"' + user.name + '",' +
        '"' + user.surname + '",' +
        '' + user.age + ',' +
        '"' + user.password + '"' +
        ');';

      await run(sql);
    }

    console.log("events");
    for (let event of events) {

      sql = 'insert into we_events (timestamp, type_id, user_id) values (' +
        '' + event.createdAt + ',' +
        '(select type_id from we_event_types where name="' + event.type + '"),' +
        '(select user_id from we_users where email="' + event.metadata.emailAddress + '")' +
        ');';

      await run(sql);
    }

    console.log("Done");
  }
  catch (err) {
    console.log(err.stack);
  }
  if (conn) {
    conn.end();
  }
})();

function run(sql) {
  return new Promise(function (fulfilled, rejected) {
    conn.query(sql, function (error, results, fields) {
      if (error) {
        return rejected(new Error(error));
      }
      return fulfilled();
    });
  })
}