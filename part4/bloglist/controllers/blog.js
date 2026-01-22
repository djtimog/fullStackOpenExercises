const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
require("dotenv").config();

router.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(blogs);
  } catch (error) {
    response.status(500).send({ error: "Failed to fetch blogs" });
  }
});

router.post("/", async (request, response, next) => {
  const { title, author, url, likes, user } = request.body;

  const blog = new Blog({ title, author, url, likes });
  try {
    if (user) {
      blog.user = user.id;
    }
    const result = await blog.save();
    const populatedResult = await result.populate("user", {
      username: 1,
      name: 1,
    });

    response.status(201).json(populatedResult);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (request, response, next) => {
  const { user } = request.body;
  try {
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: `Not Authorised` });
    }
    await Blog.findByIdAndDelete(request.params.id);
    return response.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (request, response, next) => {
  const blog = request.body;
  try {
    const foundBlog = await Blog.findById(request.params.id);

    if (!foundBlog) {
      return response.status(404).end();
    }

    foundBlog.title = blog.title;
    foundBlog.author = blog.author;
    foundBlog.url = blog.url;
    foundBlog.likes = blog.likes;

    const updatedBlog = await foundBlog.save();

    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
