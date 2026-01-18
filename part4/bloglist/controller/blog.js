const router = require("express").Router();
const Blog = require("../model/blog");
const logger = require("../utils/logger");
const { InProduction } = require("../utils/config");

router.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
  if (!InProduction) {
    logger.info(`Fetched blogs from database ${blogs.length}`);
  }

  // .catch((error) => {
  //   if (!InProduction) {
  //     logger.error(`Error fetching blogs from database: ${error.message}`);
  //   }
  //   response.status(500).send({ error: "Failed to fetch blogs" });
  // });
});

router.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);

  const result = await blog.save();

  response.status(201).json(result);
  if (!InProduction) {
    logger.info(`Added new blog: ${result.title}`);
  }

  // .catch((error) => {
  //   next(error);
  // });
});

module.exports = router;
