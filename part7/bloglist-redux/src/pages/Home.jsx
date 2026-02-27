import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Blog from "../components/Blog";
import CreateBlog from "../components/CreateBlog";
import Togglable from "../components/Togglable";

function Home() {
  const createBlogRef = useRef(null);

  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      <Togglable label="create new blog" ref={createBlogRef}>
        <CreateBlog ref={createBlogRef} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default Home;
