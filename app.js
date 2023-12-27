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
    const user = await client.db("Node-API").collection("Users").findOne({ username: username });
    if (!user) res.status(404).send({ msg: "Username not found!" });
    res.status(200).send({ user });
  } catch (error) {
  } finally {
    await client.close();
  }
});

app.post("/api/users", async (req, res) => {
  const userInfo = req.body;
  ["username", "firstname", "lastname", "email"].forEach((key) => {
    if (!Object.keys(userInfo).includes(key)) {
      res.status(400).send({ msg: "Bad request!" });
    }
  });
  const client = new MongoClient(mongoLink);
  try {
    await client.connect();
    await client.db("Node-API").collection("Users").insertOne(userInfo);
    const newUser = await client.db("Node-API").collection("Users").findOne({ username: userInfo.username });
    res.status(201).send({ user: newUser });
  } catch (error) {
  } finally {
    await client.close();
  }
});

module.exports = app;
