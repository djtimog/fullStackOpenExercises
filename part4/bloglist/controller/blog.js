const router = require("express").Router();
const Blog = require("../model/blog");
const logger = require("../utils/logger");
const { InProduction } = require("../utils/config");

router.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({});

    response.json(blogs);
    if (!InProduction) {
      logger.info(`Fetched blogs from database ${blogs.length}`);
    }
  } catch (error) {
    if (!InProduction) {
      logger.error(`Error fetching blogs from database: ${error.message}`);
    }
    response.status(500).send({ error: "Failed to fetch blogs" });
  }
});

router.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);
  try {
    const result = await blog.save();

    response.status(201).json(result);
    if (!InProduction) {
      logger.info(`Added new blog: ${result.title}`);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
    if (!InProduction) {
      logger.info(`Deleted blog with id: ${request.params.id}`);
    }
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

    response.json(updatedBlog);
    if (!InProduction) {
      logger.info(`Updated blog with id: ${request.params.id}`);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
