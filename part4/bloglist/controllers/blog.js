const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");
require("dotenv").config();

router.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({})
      .populate("user", {
        username: 1,
        name: 1,
      })
      .populate("comments", { message: 1 });
    response.json(blogs);
  } catch (error) {
    response.status(500).send({ error: "Failed to fetch blogs" });
  }
});

router.post("/", async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  try {
    if (!request.user) {
      return response.status(401).json({ error: "token required" });
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: request.user._id,
    });
    const result = await blog.save();
    await result.populate("user", {
      username: 1,
      name: 1,
    });
    await result.populate("comments", { message: 1 });

    const user = await User.findById(request.user._id);
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (request, response, next) => {
  try {
    if (!request.user) {
      return response.status(401).json({ error: "token required" });
    }

    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() !== request.user._id.toString()) {
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

    foundBlog.title = blog.title ?? foundBlog.title;
    foundBlog.author = blog.author ?? foundBlog.author;
    foundBlog.url = blog.url ?? foundBlog.url;
    foundBlog.likes = blog.likes ?? foundBlog.likes;

    const updatedBlog = await foundBlog.save();
    await updatedBlog.populate("user", {
      username: 1,
      name: 1,
    });
    await updatedBlog.populate("comments", { message: 1 });

    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/comments", async (request, response) => {
  const { id } = request.params;
  const body = request.body;
  try {
    const foundBlog = await Blog.findById(id);
    const comment = new Comment({
      message: body.message,
      blog: foundBlog._id,
    });

    const savedComment = await comment.save();

    foundBlog.comments = foundBlog.comments.concat(savedComment._id);
    const result = await foundBlog.save();

    await result.populate("user", {
      username: 1,
      name: 1,
    });
    await result.populate("comments", { message: 1 });

    response.status(200).json(result);
  } catch (error) {
    response.status(400).json({ error: "Unable to create comment" });
  }
});

module.exports = router;
