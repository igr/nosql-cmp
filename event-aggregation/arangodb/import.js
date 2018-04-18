const arangojs = require("arangojs");
const fs = require('fs');
const datasetPath = "../../dataset/";

const db = new arangojs.Database('http://127.0.0.1:8529');


(async function () {
    try {
      console.log("users");

      const users = db.collection('users');
//      await users.create();

      let docs = JSON.parse(fs.readFileSync(datasetPath + "users.json", 'utf8'));
      await users.import(docs);

      console.log("events");

      const events = db.collection('events');
//      await events.create();

      docs = JSON.parse(fs.readFileSync(datasetPath + "events_.json", 'utf8'));
      await events.import(docs);

      console.log("Done.");
    }
    catch (err) {
      console.log(err.stack);
    }
  }
)();
