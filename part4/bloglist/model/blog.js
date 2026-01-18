const mongoose = require("mongoose");
const { MONGODB_URI } = require("../utils/config");

const mongoUrl = MONGODB_URI;

mongoose
  .connect(mongoUrl, { family: 4 })
  .then(() => console.log("connected to MongoDB"));

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

module.exports = Blog;
