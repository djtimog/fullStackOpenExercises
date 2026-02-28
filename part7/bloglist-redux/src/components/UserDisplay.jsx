import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/user";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function UserDisplay({ user }) {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="mb-3">
      <h1>Blogs</h1>
      <div>
        <div className="mb-3">
          <Link to="/">blogs</Link> <Link to="/users">users</Link>
        </div>
        <span className="me-3">{user.name} logged in</span>
        <Button variant="outline-danger" size="sm" onClick={logout}>
          logout
        </Button>
      </div>
    </div>
  );
}

export default UserDisplay;
