const mysql = require('mysql');

const conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root!',
  database : 'wedb'
});

conn.connect();

try {

  run('delete from we_events;');
  run('delete from we_event_types;');
  run('delete from we_users;');

  console.log("Done");
}
catch (err) {
  console.log(err.stack);
}
if (conn) {
  conn.end();
}

function run(sql) {
  conn.query(sql, function (error, results, fields) {
    if (error) {
      console.error(error);
    }
  });
}