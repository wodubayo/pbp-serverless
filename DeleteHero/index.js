const MongoClient = require("mongodb").MongoClient;
const auth = require("../shared/index");

module.exports = function(context, req) {
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
        .findOneAndDelete({ id: heroId }, (err, result) => {
          if (err) throw err;
          context.res = {
            status: 200,
            body: { message: "Hero deleted successfully" }
          };
          database.close();
          context.done();
        });
    }
  );
};
