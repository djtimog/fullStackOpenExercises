const supertest = require("supertest");
const app = require("../app");
const { test, after, describe, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const assert = require("node:assert");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);
describe("Blog list API tests", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    const user = User.findOne({});
    const newBlog = new Blog({
      title: "First Blog title 001",
      author: "First Author",
      url: "https://example.com/first-blog-001",
      likes: 0,
      user: user._id,
    });
    await newBlog.save();
  });
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
  });

  test("Blogs had unique identifier property named id", async () => {
    const blogs = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    blogs.body.forEach((blog) => {
      if (!blog.id) {
        return false;
      }
    });
  });

  test("Add a new blog to the database", async () => {
    const blogs = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const postResponse = await api
      .post("/api/blogs")
      .send(newBlog)
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const getResponse = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const { author, likes, title, url } = postResponse.body;

    assert.strictEqual(getResponse.body.length, blogs.body.length + 1);
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
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const { likes } = postResponse.body;

    assert.strictEqual(likes, 0);
  });

  test("Blog without title and url is not added", async () => {
    const blogWithoutTitleAndUrl = {};

    await api
      .post("/api/blogs")
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .send(blogWithoutTitleAndUrl)
      .expect(400);
  });

  test("Blog addition fails with status code 401 if token is not provided", async () => {
    const blogToAdd = {
      title: "Unauthorized Blog",
      author: "Unauthorized Author",
      url: "https://example.com/unauthorized-blog",
      likes: 0,
    };

    await api.post("/api/blogs").send(blogToAdd).expect(401);
  });

  test("Delete a blog by id", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogs = response.body;
    const blogToDelete = blogs[0];
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .expect(204);

    const getResponse = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(getResponse.body.length, blogs.length - 1);
  });

  test("Update a blog's likes by id", async () => {
    const blog = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const updatedLikes = { likes: blog.body[0].likes + 10 };

    const putResponse = await api
      .put(`/api/blogs/${blog.body[0].id}`)
      .send(updatedLikes)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(putResponse.body.likes, blog.body[0].likes + 10);
  });
});

after(async () => {
  await mongoose.connection.close();
});
