const MongoClient = require("mongodb").MongoClient;
const auth = require("../shared/index");

module.exports = function(context, req) {
  context.log("Javascript HTTP trigger function processed a request");
  MongoClient.connect(
    process.env.CosmosDBURL,
    { auth: auth },
    (err, database) => {
      if (err) throw err;
      let hero = ({ id, name, saying } = req.body);
      let heroId = req.params.id;
      const db = database.db(process.env.CosmosDB);

      db
        .collection("Heroes")
        .findOneAndUpdate(
          { id: heroId },
          { $set: { id: hero.is, name: hero.name, saying: hero.saying } },
          (err, result) => {
            if (err) throw err;
            context.res = {
              body: hero
            };
            database.close();
            context.done();
          }
        );
    }
  );
};
