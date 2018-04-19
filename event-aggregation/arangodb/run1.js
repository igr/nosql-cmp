const arangojs = require("arangojs");
const aqlQuery = require('arangojs').aqlQuery;

const db = new arangojs.Database('http://127.0.0.1:8529');

console.time("operation");

const alternativeAql = `
FOR a in (FOR event IN events
  COLLECT
    emailAddress = event.metadata.emailAddress,
    type = event.type WITH COUNT INTO count
  COLLECT email = emailAddress INTO perUser KEEP type, count
  RETURN MERGE(PUSH(perUser[* RETURN {[LOWER(CURRENT.type)]: CURRENT.count}], {email})))
SORT a.create desc
LIMIT 10
RETURN a
`;

db.query(aqlQuery` 
FOR event IN events
COLLECT
emailAddress = event.metadata.emailAddress,
  type = event.type WITH COUNT INTO count
COLLECT email = emailAddress INTO perUser KEEP type, count
LET ret = MERGE(PUSH(perUser[* RETURN {[CURRENT.type]: CURRENT.count}], {email}))
SORT ret.CREATE DESC
LIMIT 10
RETURN ret
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
