const app = require("./app");
const blogRouter = require("./controller/blog");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require("./utils/middleware");

require("dotenv").config();
const express = require("express");

const cors = require("cors");

app.use(cors());
app.use(express.json());

// Using console.log() to represent logger
//The logger package is not properly configured.

app.use(requestLogger);

app.use("/api/blogs", blogRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
