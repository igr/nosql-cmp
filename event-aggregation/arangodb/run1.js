const arangojs = require("arangojs");
const aqlQuery = require('arangojs').aqlQuery;

const db = new arangojs.Database('http://127.0.0.1:8529');

console.time("operation");

db.query(aqlQuery`
FOR event IN events
  COLLECT
    email = event.metadata.emailAddress,
    type = event.type WITH COUNT INTO count
  SORT null
  LIMIT 10
  RETURN { 
      email,
      s: {
        type,
        count
      }
  }
`).then(
  cursor => cursor.all()
  ).then(
  data => {
    console.timeEnd("operation");
    data.forEach(d => {
      console.log(d);
    });
  },
  err => console.error('Failed to execute query:', err)
);
