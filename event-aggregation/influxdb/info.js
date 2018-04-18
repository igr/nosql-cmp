const Influx = require('influx');

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'wedb'
});

(async function() {

  const dbNames = await influx.getDatabaseNames();
  console.log('Databases: ' + dbNames.join(', '));

  const mNames = await influx.getMeasurements();
  console.log('Measurements: ' + mNames.join(', '));

})();