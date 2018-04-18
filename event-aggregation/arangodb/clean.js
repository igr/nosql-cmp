const arangojs = require("arangojs");

const db = new arangojs.Database('http://127.0.0.1:8529');

(async function () {
  const c = await db.listCollections();

  for (let col of c) {
    console.log(col.name);
    let collection = db.collection(col.name);
    await collection.truncate();
  }

  console.log("Done");
})();