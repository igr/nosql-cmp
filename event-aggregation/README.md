# Event aggregation

_Users_ are producing number of _events_, each event has it's _type_.

Events need to be aggregated into following reports.

## Scenario 1

+ For given time period,
+ count events of each type,
+ for each user,
+ sort by given event type.

For example:

|User    | Event A | Event B (sort) |
|--------|:-------:|:--------------:|
|email 1 | 20      | 30             |
|email 2 | 22      | 27             |

### Results

+ ArangoDB and MySQL performs fast.
+ Had an issue to figure out how to do things in ArangoDB.
+ MongoDb was intuitive.
+ MongoDB performs slower then ArangoDB and MySQL
+ Didn't know how to use influxdb.



