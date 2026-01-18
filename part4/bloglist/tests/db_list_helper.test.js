const supertest = require("supertest");
const app = require("../app");
const { test, after, describe } = require("node:test");
const mongoose = require("mongoose");

const api = supertest(app);
describe("Blog list API tests", () => {
  test("Get all blog list from db", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    // console.log(response);
  });

  test("Blogs had unique identifier property named id", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .then((response) => {
        response.body.forEach((blog) => {
          if (!blog.id) {
            throw new Error("Blog missing 'id' property");
          }
        });
      });
  });
});

after(async () => {
  await mongoose.connection.close();
});
