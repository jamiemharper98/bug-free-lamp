const mongoose = require("mongoose");

const userScheme = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
      unique: true,
    },
    firstname: {
      type: String,
      required: [true, "Please enter your first name"],
    },
    lastname: {
      type: String,
      required: [true, "Please enter your last name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", userScheme);

module.exports = Users;
