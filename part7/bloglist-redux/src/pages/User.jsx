import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function User() {
  const { id } = useParams();
  const user = useSelector((state) =>
    state.usersInfos.find((userInfo) => userInfo.id == id),
  );
  if (!user) {
    return null;
  }
  return (
    <div>
      <h2>{user.name}</h2>

      <h4>Added Blogs</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default User;
