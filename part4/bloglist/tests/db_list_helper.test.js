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

  test("If likes property is missing, it will default to 0", async () => {
    const blogWithoutLikes = {
      title: "Blog without likes",
      author: "New Author",
      url: "https://example.com/blog-without-likes",
    };

    const postResponse = await api
      .post("/api/blogs")
      .send(blogWithoutLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const { likes } = postResponse.body;

    assert.strictEqual(likes, 0);
  });

  test("Blog without title and url is not added", async () => {
    const blogWithoutTitleAndUrl = {};

    await api.post("/api/blogs").send(blogWithoutTitleAndUrl).expect(400);
  });

  test("Delete a blog by id", async () => {
    const blogToDelete = blogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const getResponse = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(getResponse.body.length, blogs.length - 1);
  });

  test("Update a blog's likes by id", async () => {
    const blogToUpdate = blogs[1];
    const updatedLikes = { likes: blogToUpdate.likes + 10 };

    const putResponse = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedLikes)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(putResponse.body.likes, blogToUpdate.likes + 10);
  });
});

after(async () => {
  await mongoose.connection.close();
});
