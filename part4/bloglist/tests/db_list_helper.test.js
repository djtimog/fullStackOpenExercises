const supertest = require("supertest");
const app = require("../app");
const { test, after, describe } = require("node:test");
const mongoose = require("mongoose");
const assert = require("node:assert");

const api = supertest(app);
describe("Blog list API tests", () => {
  let blogs;
  const newBlog = {
    title: "New Blog title 00323",
    author: "New Auth",
    url: "https://example.com/new-blog-00323",
    likes: 0,
  };

  test("Get all blog list from db", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    blogs = response.body;
  });

  test("Blogs had unique identifier property named id", async () => {
    blogs.forEach((blog) => {
      if (!blog.id) {
        throw new Error("Blog missing 'id' property");
      }
    });
  });

  test("Add a new blog to the database", async () => {
    const postResponse = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const getResponse = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const { author, likes, title, url } = postResponse.body;

    assert.strictEqual(getResponse.body.length, blogs.length + 1);
    assert.deepEqual({ author, likes, title, url }, newBlog);
  });
});

after(async () => {
  await mongoose.connection.close();
});
