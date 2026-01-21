const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (error) {
    responsestatus(500).send({ error: "Failed to fetch users" });
  }
});

userRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body;
  if (!password || password.length < 3) {
    return response
      .status(400)
      .json({ error: "Password must be at least 3 characters long" });
  }
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    name,
    passwordHashed: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
