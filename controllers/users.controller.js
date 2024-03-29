const {
  selectUsers,
  createNewUser,
  selectUserByUsername,
  updateUserByUsername,
  removeUserByUsername,
} = require("../models/users.models");
const MongoClient = require("mongodb").MongoClient;
const { mongoLink, mongoDbName } = require("../testMongoDB");

const client = new MongoClient(mongoLink);

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await selectUsers(client, mongoDbName);
    res.status(200).send({ users });
  } catch (next) {
  } finally {
    await client.close();
  }
};

exports.postNewUser = async (req, res, next) => {
  const userInfo = req.body;
  ["username", "firstname", "lastname", "email"].forEach((key) => {
    if (!Object.keys(userInfo).includes(key)) {
      res.status(400).send({ msg: "Bad request!" });
    }
  });
  try {
    const newUser = await createNewUser(client, mongoDbName, userInfo);
    if (!newUser) res.status(400).send({ msg: "User already exists!" });
    res.status(201).send({ user: newUser });
  } catch (next) {
  } finally {
    await client.close();
  }
};

exports.getUserByUsername = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await selectUserByUsername(client, mongoDbName, username);
    if (!user) res.status(404).send({ msg: "Username not found!" });
    res.status(200).send({ user });
  } catch (next) {
  } finally {
    await client.close();
  }
};

exports.patchUserByUsername = async (req, res, next) => {
  const userInfoToUpdate = req.body;
  const { username } = req.params;
  if (!Object.keys(userInfoToUpdate).length) res.status(400).send({ msg: "Bad request!" });
  else
    try {
      const user = await updateUserByUsername(client, mongoDbName, username, userInfoToUpdate);
      if (!user) res.status(404).send({ msg: "Username not found!" });
      res.status(200).send({ user });
    } catch (next) {
    } finally {
      await client.close();
    }
};

exports.deleteUserByUsername = async (req, res, next) => {
  const { username } = req.params;
  try {
    const deleted = await removeUserByUsername(client, mongoDbName, username);
    deleted.deletedCount ? res.sendStatus(204) : res.status(400).send({ msg: "Something went wrong - try again!" });
  } catch (next) {
  } finally {
    await client.close();
  }
};
