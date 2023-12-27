const request = require("supertest");
const app = require("../app");
const allCategories = require("../data/categoryData");
const allQuotes = require("../data/quoteData");
const allUsers = require("../data/userdata");
const mongoLink = require("../testMongoDB");
const seed = require("../seed");
const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});
beforeEach(async () => {
  await seed(mongoLink, allUsers, allCategories, allQuotes);
});

describe("USERS", () => {
  describe("GET All Users", () => {
    test("should return all of the users in the database", async () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users.length).toBe(6);
          users.forEach((user) => {
            expect(user).toMatchObject({
              _id: expect.any(String),
              username: expect.any(String),
              firstname: expect.any(String),
              lastname: expect.any(String),
              email: expect.any(String),
            });
          });
        });
    });
  });
  describe("GET User by username", () => {
    test("When given a username, should return the document for that user", async () => {
      return request(app)
        .get("/api/users/ASKJHD")
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user).toMatchObject({
            _id: expect.any(String),
            username: "ASKJHD",
            firstname: "james",
            lastname: "harper",
            email: "b@a.com",
          });
        });
    });
    test("If username doesnt exist, return 404", () => {
      return request(app)
        .get("/api/users/banana")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Username not found!");
        });
    });
  });
});
