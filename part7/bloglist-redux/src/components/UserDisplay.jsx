import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/user";

function UserDisplay({ user }) {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <h2>Blogs</h2>
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
    </div>
  );
}

export default UserDisplay;
