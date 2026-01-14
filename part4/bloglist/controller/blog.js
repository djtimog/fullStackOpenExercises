const router = require("express").Router();
const Blog = require("../model/blog");

router.get("/", (request, response) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs);
      console.log("Fetched blogs from database");
    })
    .catch((error) => {
      console.error(`Error fetching blogs from database: ${error.message}`);
      response.status(500).send({ error: "Failed to fetch blogs" });
    });
});

router.post("/", (request, response, next) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
      console.log(`Added new blog: ${result.title}`);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
