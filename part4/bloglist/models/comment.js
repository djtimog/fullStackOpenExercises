const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  message: String,
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
});

commentSchema.set("toJSON", {
  transform: (_, returnObj) => {
    returnObj.id = returnObj._id.toString();
    delete returnObj._id;
    delete returnObj.__v;
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
