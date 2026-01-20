const router = require("express").Router();
const Blog = require("../models/blog");

router.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    response.status(500).send({ error: "Failed to fetch blogs" });
  }
});

router.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);
  try {
    const result = await blog.save();

    response.status(201).json(result);
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
