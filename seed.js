const allCategories = require("./data/categoryData");
const allQuotes = require("./data/quoteData");
const allUsers = require("./data/userdata");

const MongoClient = require("mongodb").MongoClient;

async function seedDB() {
  /// replace uri with link to atlas db - not sure if it works with local mongo, mine hasnt installed yet
  const uri = "mongodb+srv://admin:Password@cluster0.35psafi.mongodb.net/Node-API?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("connected");
    const mngdb = client.db("Node-API");
    mngdb.dropDatabase();
    mngdb.createCollection("Quotes");
    mngdb.createCollection("Users");
    mngdb.createCollection("Categories");

    mngdb.collection("Users").insertMany(allUsers);
    mngdb.collection("Categories").insertMany(allCategories);
    const catsForSeed = await mngdb.collection("Categories").find({}).toArray();
    const usersForSeed = await mngdb.collection("Users").find({}).toArray();
    const formattedQuotes = formatQuotes(allQuotes, usersForSeed, catsForSeed);

    mngdb.collection("Quotes").insertMany(formattedQuotes);
  } catch {}
}

seedDB();

const formatQuotes = (allQuotes, usersForSeed, catsForSeed) => {
  for (const quote of allQuotes) {
    for (const user of usersForSeed) {
      if (user.username === quote.quoteUser) {
        quote.userId = user._id;
        delete quote.quoteUser;
      }
    }
    for (const cat of catsForSeed) {
      if (cat.categoryName === quote.quoteCategory) {
        quote.categoryId = cat._id;
        delete quote.quoteCategory;
      }
    }
  }
  return allQuotes;
};
