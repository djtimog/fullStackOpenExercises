import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { likeBlog } from "../reducers/blogs";
import Comments from "../components/Comments";

function Blog() {
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((blogInfo) => blogInfo.id == id),
  );
  const dispatch = useDispatch();

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>

      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      </div>

      <p>added by {blog.user.name}</p>
      <Comments id={blog.id} comments={blog.comments} />
    </div>
  );
}

export default Blog;
