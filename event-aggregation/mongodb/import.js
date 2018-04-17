/*
Insert data into the Mongo.
*/
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const datasetPath = "../../dataset/";
const url = 'mongodb://localhost:27017';

(async function() {
  let client;
  try {
    client = await MongoClient.connect(url);
    const db = client.db('wddb');

    console.log("Importing...");

    await insertJsonFile(db, 'users.json', 'users');
    await insertJsonFile(db, 'events_.json', 'events');

    console.log("creating indices");

    // await db.collection('events').createIndex({ createdAt: 1});
    // await db.collection('events').createIndex({ "metadata.emailAddress": 'text' });
    // await db.collection('users').createIndex({ "email": 'text' });

    console.log("Done.");
  }
  catch (err) {
    console.log(err.stack);
  }
  if (client) {
    client.close();
  }
})();

const insertJsonFile = async function(db, file, collectionName) {
  console.log("Importing " + collectionName);

  const users = JSON.parse(fs.readFileSync(datasetPath + file, 'utf8'));
  const collection = db.collection(collectionName);

  try {
    let result = await collection.insertMany(users);
    console.log("Inserted " + file + ": " + result.result.n);
  }
  catch (err) {
    console.log(err.stack);
  }
};
