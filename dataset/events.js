/*
Events dataset generator.
*/

const fs = require('fs');
const Random = require("random-js");
const random = new Random(Random.engines.mt19937().autoSeed());

// users data
const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

// config
let totalEvents = 500 * 1000;
const eventTypes = ['DEPLOY', 'STOP', 'START', 'REMOVE', 'CREATE'];
const services = ['github', 'bitbucket', 'gitlab'];
const timestampNow = new Date().getTime();
const startDate = new Date(timestampNow - 6 * 2592000000);    // six months
// randomize timestamp
const delta = (timestampNow - startDate.getTime()) / totalEvents;
let fuzzyDelta = delta * 0.05;

// events
const events = [];
let timestamp = startDate.getTime();

while(totalEvents > 0) {
  const user = random.pick(users);

  const event = {
    'createdAt': timestamp,
    'type': random.pick(eventTypes),
    'projectId': random.string(10),
    'projectName': random.string(10),
    'id': random.uuid4(),
    'metadata': {
      "emailAddress": user.email,
      "commit": random.string(6),
      "shortRepository": null,
      "userInitials": "XX",
      "emailAddressHash": "c62c82833a3fc96595a17bb81d5f4878",
      "serviceId": random.pick(services),
      "repository": "http://" + random.string(30) + ".git",
      "branch": "master",
      "groupUid": random.string(6),
    }
  };

  events.push(event);

	timestamp = timestamp + delta + random.real(-fuzzyDelta, fuzzyDelta);
	totalEvents = totalEvents - 1;
}

console.log("Done, " + events.length + " events created.");

const json = JSON.stringify(events);
fs.writeFileSync('events_.json', json, 'utf8');
