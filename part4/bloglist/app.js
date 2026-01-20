const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const blogRouter = require("./controller/blog");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require("./utils/middleware");
const { MONGODB_URI } = require("../utils/config");
const { InProduction } = require("./utils/config");

const mongoUrl = MONGODB_URI;
const app = express();

app.use(cors());
app.use(express.json());
if (!InProduction) {
  logger.info("connecting to", mongoUrl);
  app.use(requestLogger);
}

mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use("/api/blogs", blogRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
