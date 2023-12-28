exports.selectUsers = async (client, mongoDbName) => {
  await client.connect();
  return client.db(mongoDbName).collection("Users").find({}).toArray();
};

exports.createNewUser = async (client, mongoDbName, userInfo, usernameAdded) => {
  await client.connect();
  await client.db(mongoDbName).collection("Users").insertOne(userInfo);
  return client.db(mongoDbName).collection("Users").findOne({ username: userInfo.username });
};

exports.selectUserByUsername = async (client, mongoDbName, username) => {
  await client.connect();
  return client.db(mongoDbName).collection("Users").findOne({ username });
};
