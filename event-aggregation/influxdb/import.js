const Influx = require('influx');
const fs = require('fs');
const datasetPath = "../../dataset/";

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'wedb',
  schema: [
    {
      measurement: 'events',
      fields: {
        time: Influx.FieldType.INTEGER,
        type: Influx.FieldType.STRING,
        email: Influx.FieldType.STRING
      },
      tags: [
        'type', 'email'
      ]
    }
  ]
});


(async function() {

  const events = JSON.parse(fs.readFileSync(datasetPath + 'events_.json', 'utf8'));

  try {
    console.log("Importing...");

    for (let event of events.slice(1,1000)) {
      await influx.writePoints([
        {
          measurement: 'events',
          tags: {
            type: event.type,
            email: event.metadata.emailAddress
          },
          fields: {
            time: event.createdAt,
            type: event.type,
            email: event.metadata.emailAddress
          },
        }
      ]);
    }

    console.log("Done.");
  }
  catch (err) {
    console.log(err.stack);
  }
})();