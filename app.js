const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const mongoLink = require("./testMongoDB");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ alive: "True" });
});

app.get("/api/users", async (req, res) => {
  const client = new MongoClient(mongoLink);
  try {
    await client.connect();
    const users = await client.db("Node-API").collection("Users").find({}).toArray();
    res.status(200).send({ users });
  } catch (error) {
    res.status(500).json(error);
  } finally {
    await client.close();
  }
});

app.get("/api/users/:username", async (req, res) => {
  const { username } = req.params;
  const client = new MongoClient(mongoLink);
  try {
    await client.connect();
    const user = await client.db("Node-API").collection("Users").find({ username: username }).toArray();
    if (!user.length) res.status(404).send({ msg: "Username not found!" });
    res.status(200).send({ user: user[0] });
  } catch (error) {
  } finally {
    await client.close();
  }
});

module.exports = app;
