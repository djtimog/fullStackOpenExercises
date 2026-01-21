const User = require("../models/user");

const DeleteUsers = async () => {
  await User.deleteMany({});
};

const AddNewUser = async () => {
  const user = new User({
    username: "djtimog",
    name: "djtimog",
    passwordHashed:
      "$2b$10$1aP.64BZyNqdi4hnv6qvuevOlD0Xucz3WRi1GEpeDDa9usGPZp7oi",
  });
  await user.save();
};

const userWithOutName = {
  username: "djtimog",
  password: "djtimog",
};

const userWithOutPassword = {
  username: "djtimog",
  name: "djtimog",
};

module.exports = {
  AddNewUser,
  DeleteUsers,
  userWithOutName,
  userWithOutPassword,
};
