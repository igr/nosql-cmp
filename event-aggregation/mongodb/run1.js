const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

(async function () {
  let client;
  try {
    client = await MongoClient.connect(url);
    const db = client.db('wddb');
    const collection = db.collection("events");

    console.log("Running...");
    console.time('operation');

    // INPUT
    const in_sortByEventType = 'types.START';
    const in_to = new Date().getTime();
    const in_from = new Date(2017, 1, 1).getTime();

    const docs = await collection.aggregate([
      {
        $match: {
          createdAt: {$lt: in_to, $gt: in_from}
        }
      },
      {
        $group: {
          _id: {
            email: "$metadata.emailAddress",
            type: "$type",
          },
          //createdAt: { $first: "$createdAt" },  // a trick how to blind copy objects property
          typeCount: {"$sum": 1},
        }
      },
      {
        $group: {
          _id: "$_id.email",
          types: {
            $push: {
              k: "$_id.type",
              v: "$typeCount"
            },
          },
          totalCount: {"$sum": "$typeCount"},
        }
      },
      {
        $project : {
          types: { $arrayToObject: '$types' },
          totalCount: '$totalCount',
          createdAt: '$createdAt'
        }
      },
      {
        $sort: {in_sortByEventType : -1}
      },
      {$limit: 10},
      {
        $lookup:
          {
            from: "users",
            localField: "_id",
            foreignField: "email",
            as: "user"
          }
      },
    ], {
      allowDiskUse: true
    }).toArray();

    console.timeEnd('operation');
    console.log("Total fetched records: " + docs.length);
    console.log(JSON.stringify(docs, null, 2));
  }
  catch (err) {
    console.log(err.stack);
  }
  if (client) {
    client.close();
  }
})();
