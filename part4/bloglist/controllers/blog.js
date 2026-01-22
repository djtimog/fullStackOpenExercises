const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
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

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

router.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);
  try {
    console.log(getTokenFrom(request), process.env.JWT_SECRET);
    const decodedToken = jwt.verify(
      getTokenFrom(request),
      process.env.JWT_SECRET,
    );

    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);
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
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
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
