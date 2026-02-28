import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Blog from "../components/Blog";
import CreateBlog from "../components/CreateBlog";
import Togglable from "../components/Togglable";
import ListGroup from "react-bootstrap/ListGroup";

function Home() {
  const createBlogRef = useRef(null);

  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      <Togglable label="create new blog" ref={createBlogRef}>
        <CreateBlog ref={createBlogRef} />
      </Togglable>
      <ListGroup>
        {blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>
            <Blog blog={blog} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Home;
