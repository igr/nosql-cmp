const arangojs = require("arangojs");
const aqlQuery = require('arangojs').aqlQuery;

const db = new arangojs.Database('http://127.0.0.1:8529');

console.time("operation");

db.query(aqlQuery` 
FOR a in (FOR event IN events
  COLLECT
    emailAddress = event.metadata.emailAddress,
    type = event.type WITH COUNT INTO count
  COLLECT email = emailAddress INTO perUser KEEP type, count
  RETURN MERGE(PUSH(perUser[* RETURN {[LOWER(CURRENT.type)]: CURRENT.count}], {email})))
SORT a.create desc
LIMIT 10
RETURN a
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
