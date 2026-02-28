import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Notification from "./Notification";
import { loginUser } from "../reducers/user";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
    <div className="container">
      <h2>Log in to application</h2>
      <Notification />
      <Form onSubmit={login}>
        <Form.Group className="mb-3">
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            width={"200px"}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Button variant="outline-secondary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default LoginForm;
