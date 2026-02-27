import React, { useState } from "react";
import userService from "../services/user";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notification";
import blogService from "../services/blogs";
import Notification from "./Notification";

function LoginForm({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const login = async (event) => {
    event.preventDefault();
    const userLogins = {
      username,
      password,
    };
    try {
      const userData = await userService.login(userLogins);
      setUser(userData);
      blogService.setToken(userData.token);
      localStorage.setItem("loggedBlogListUser", JSON.stringify(userData));
      dispatch(setNotification(`Welcome back ${userData.name}`, "green"));
    } catch (error) {
      dispatch(setNotification("Wrong username or password", "red"));
      console.log(error);
      return;
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <form onSubmit={login}>
        <div>
          <label>
            username
            <input
              type="text"
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default LoginForm;
