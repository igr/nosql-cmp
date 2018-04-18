const mysql = require('mysql');

const conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root!',
  database : 'wedb'
});

conn.connect();

try {

  console.time("operation");
  const sql = `
  select u.user_id, 
	count(case when e.type_id = (select type_id from we_event_types where name='DEPLOY') THEN 1 END) c_deploy,
	count(case when e.type_id = (select type_id from we_event_types where name='STOP') THEN 1 END) c_stop,
	count(case when e.type_id = (select type_id from we_event_types where name='START') THEN 1 END) c_start,
	count(case when e.type_id = (select type_id from we_event_types where name='REMOVE') THEN 1 END) c_remove,
	count(case when e.type_id = (select type_id from we_event_types where name='CREATE') THEN 1 END) c_create,
	count(e.type_id) c_all
    from we_events e
    left join we_users u on e.user_id=u.user_id
    group by u.user_id
    order by c_deploy desc
    limit 10
  `;

  conn.query(sql, function (error, results, fields) {
    if (error) {
      console.error(error);
    }
    console.log(results)
    console.timeEnd("operation");
  });

  console.log("Done");
}
catch (err) {
  console.log(err.stack);
}
if (conn) {
  conn.end();
}
