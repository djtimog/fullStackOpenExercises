const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, require: true, unique: true },
  name: { type: String, require: true, minlength: 3 },
  passwordHashed: { type: String, require: true },
});

userSchema.set("toJSON", {
  transform: (_, returnObj) => {
    returnObj.id = returnObj._id.toString();
    delete returnObj._id;
    delete returnObj.__v;
    delete returnObj.passwordHashed;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
