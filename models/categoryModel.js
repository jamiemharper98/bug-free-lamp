const mongoose = require("mongoose");

const categoryScheme = mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
  },
  categoryDesc: {
    type: String,
    required: true,
    unique: true,
  },
});

const Categories = mongoose.model("Categories", categoryScheme);

module.exports = Categories;
