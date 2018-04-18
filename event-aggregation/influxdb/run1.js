const Influx = require('influx');

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'wedb'
});

influx.query(

  'select type from events GROUP BY email'
  //'select count(type) as type_count from events GROUP BY type'

).then(results => {
  console.log(results)
});
