const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const blogRouter = require("./controllers/blog");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
} = require("./utils/middleware");
const { MONGODB_URI, InProduction, InTest } = require("./utils/config");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const testingRouter = require("./controllers/testing");

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

app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);

app.use(tokenExtractor);
app.use("/api/blogs", userExtractor, blogRouter);
if (InTest) {
  app.use("/api/testing", testingRouter);
}

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
