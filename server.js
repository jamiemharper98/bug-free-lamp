
const app = require('./app')
const mongoose = require("mongoose");

//routes

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
