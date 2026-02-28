import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { likeBlog } from "../reducers/blogs";
import Comments from "../components/Comments";
import Button from "react-bootstrap/Button";

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
      <h4>
        {blog.title} {blog.author}
      </h4>

      <a href={blog.url}>{blog.url}</a>
      <div className="mt-3">
        <span className="me-2">{blog.likes} likes</span>
        <Button
          variant="primary"
          onClick={() => dispatch(likeBlog(blog))}
          size="sm"
        >
          like
        </Button>
      </div>

      <p>added by {blog.user.name}</p>
      <Comments id={blog.id} comments={blog.comments} />
    </div>
  );
}

export default Blog;
