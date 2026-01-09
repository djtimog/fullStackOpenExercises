const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);

mongoose
  .connect(url, { family: 4 })
  .then(() => console.log("MongoDb connected!"))
  .catch((error) => console.log("error message", error));

const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  number: String,
});

personSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
