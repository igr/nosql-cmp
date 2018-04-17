/*
Cleans all the collections.
*/
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

(async function() {
  let client;
  try {
    client = await MongoClient.connect(url);
    const db = client.db('wddb');

    await db.collection('users').drop();
    await db.collection('events').drop();

    console.log("Done.");
  }
  catch (err) {
    console.log(err.stack);
  }
  if (client) {
    client.close();
  }
})();