const Influx = require('influx');

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'wedb'
});


(async function() {

  await influx.dropDatabase('wedb');
  await influx.createDatabase('wedb');

  console.log("Done.");

})();