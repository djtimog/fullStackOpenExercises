const mongoose = require("mongoose");
require("moongoose").config();

const url = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);

mongoose
  .connect(url, { family: 4 })
  .then(() => console.log("MongoDb connected!"))
  .catch((error) => console.log("error message", error));

const personSchema = mongoose.Schema({
  name: String,
  number: Number,
});

module.exports = mongoose.model("Person", personSchema);
