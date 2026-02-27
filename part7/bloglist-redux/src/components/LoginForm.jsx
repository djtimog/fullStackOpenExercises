import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Notification from "./Notification";
import { loginUser } from "../reducers/user";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const login = async (event) => {
    event.preventDefault();
    const userLogins = {
      username,
      password,
    };
    dispatch(loginUser(userLogins));
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
