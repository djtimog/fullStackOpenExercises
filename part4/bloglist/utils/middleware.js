const User = require("../models/user");
const logger = require("./logger");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  logger.info(`Method: ${request.method}`);
  logger.info(`Path:   ${request.path}`);
  logger.info(`Body:   ${JSON.stringify(request.body)}`);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response.status(400).json({
      error: "expected `username` to be unique",
    });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const getTokenFrom = (request) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
      return authorization.replace("Bearer ", "");
    }
    return null;
  };

  const token = getTokenFrom(request);
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (!request.body) {
        request.body = {};
      }
      request.body.decodedToken = decodedToken;
    } catch (error) {
      return response.status(401).json({ error: "invalid token" });
    }
  }

  next();
};

const userExtractor = async (request, response, next) => {
  if (!request.body) {
    request.body = {};
  }
  try {
    const { decodedToken } = request.body;

    if (decodedToken) {
      const user = await User.findById(decodedToken.id);
      request.user = user;
    }

    next();
  } catch (error) {
    logger.error(`userExtractor error: ${error.message}`);
    next(error);
  }
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
