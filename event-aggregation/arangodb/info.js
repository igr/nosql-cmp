const arangojs = require("arangojs");

const db = new arangojs.Database('http://127.0.0.1:8529');

(async function () {
  const c = await db.collections();

  console.log("Collections");

  for (let col of c) {
    console.log(col.name);
  }

  const cursor = await db.query({
      query: "RETURN @value",
      bindVars: { value: Date.now() }
  });

  const result = await cursor.next();
  console.log(result);

})();