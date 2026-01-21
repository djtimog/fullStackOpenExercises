const { beforeEach, after, describe, test } = require("node:test");
const supertest = require("supertest");
const app = require("../app");
const {
  userWithOutName,
  userWithOutPassword,
} = require("../utils/for_user_test");
const { default: mongoose } = require("mongoose");

const api = supertest(app);

describe("Creating User Error test", () => {
  // beforeEach(async () => {
  //   await DeleteUsers();
  //   await AddNewUser();
  // });

  test("for when user name is empty", async () => {
    await api
      .post("/api/users")
      .send(userWithOutName)
      .expect(400)
      .expect({ error: "expected `username` to be unique" });
  });

  test("for when password is empty", async () => {
    await api
      .post("/api/users")
      .send(userWithOutPassword)
      .expect(400)
      .expect({ error: "Password must be at least 3 characters long" });
  });

  test("for when username isn't unique", async () => {
    await api
      .post("/api/users")
      .send({
        username: "djtimog",
        name: "djtimog",
        password: "djtimog",
      })
      .expect(400)
      .expect({ error: "expected `username` to be unique" });
  });
});

after(() => {
  mongoose.connection.close();
});
