const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const quoteScheme = mongoose.Schema(
  {
    quoteText: {
      type: String,
      required: true,
    },
    quoteAuthor: {
      type: String,
      required: false,
    },
    quoteOrigin: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    isPrivate: {
      type: Boolean,
      required: false,
    },
    catergoryId: {
      type: ObjectId,
      required: true,
    },
    userId: {
      type: ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Quotes = mongoose.model("Quotes", quoteScheme);

module.exports = Quotes;
