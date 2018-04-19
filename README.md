# NoSQL comparisons

This is a simple, non-scientific comparison of how various noSQL databases performs in different real-life scenarios. The purpose is to learn how different engines work and check how does it feel to work with it.

All the code is written in JavaScript.

## Engines

+ [MongoDB](https://www.mongodb.com)
+ [influxdb](https://www.influxdata.com)
+ [ArangoDB](https://www.arangodb.com)
+ [MySQL](https://www.mysql.com) - just for the comparison

## Dataset

Datasets for the tests are generated in [dataset](/dataseet) folder. Each dataset has it's `.md` file with explanation what it is for.

Generated datasets are NOT committed to the repo and they are named as `*_.json`. 

## Use Cases

Each use case has several scenarios. All scenarios are separated in folders. The interface in each folder is the same:

+ `up.sh` - runs the data engine using Docker
+ `down.sh` - shutdowns the data engine (Docker volumes are not removed!)
+ `import.sh` - imports the dataset into the engine
+ `clean.sh` - cleans the dataset
+ `info.sh` - optional quick misc information, useful for debugging
+ `run.sh <scenario_number>` - run the scenario

### List

+ [Event Aggregation](event-aggregation/README.md)
