import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

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
      <h4>{user.name}</h4>

      <h6>Added Blogs</h6>
      <ListGroup>
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default User;
