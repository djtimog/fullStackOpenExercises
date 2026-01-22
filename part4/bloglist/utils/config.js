require("dotenv").config();

const PORT = process.env.PORT;

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const InProduction = process.env.NODE_ENV === "production";

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  MONGODB_URI,
  PORT,
  InProduction,
  JWT_SECRET,
};
