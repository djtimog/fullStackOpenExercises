const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Using console.log() to represent logger
//The logger package is not properly configured.

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
app.use(requestLogger);

const blogSchema = mongoose.Schema({
  title: { type: String, required: true, minlength: 3 },
  author: { type: String, required: true, minlength: 3 },
  url: { type: String, required: true },
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (_, returnObj) => {
    returnObj.id = returnObj._id.toString();
    delete returnObj._id;
    delete returnObj.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

const mongoUrl = process.env.MONGODB_URI;
mongoose
  .connect(mongoUrl, { family: 4 })
  .then(() => console.log("connected to MongoDB"));

app.use(express.json());

app.get("/api/blogs", (request, response) => {
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

app.post("/api/blogs", (request, response, next) => {
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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  console.error(`Unhandled error: ${error.message}`);
  next(error);
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
