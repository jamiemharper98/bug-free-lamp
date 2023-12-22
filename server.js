const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/userModel");

//routes

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Node api");
});

app.get("/blog", (req, res) => {
  res.send("Hello blog ewqweqw ");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: `Cannot find product with the id ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: `Cannot find product with the id ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: `Cannot find product with the id ${id}` });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect("mongodb+srv://admin:Password@cluster0.35psafi.mongodb.net/Node-API?retryWrites=true&w=majority")
  .then(() => {
    console.log("connected to mongo db");
    app.listen(3000, () => {
      console.log("Running on port 3000");
    });
  })
  .catch(() => {
    console.log("error");
  });
