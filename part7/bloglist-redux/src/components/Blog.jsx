import { useState } from "react";
import { deleteBlog, likeBlog } from "../reducers/blogs";
import { useDispatch } from "react-redux";

const Blog = ({ blog, user }) => {
  const [viewDetails, setViewDetails] = useState(false);
  const dispatch = useDispatch();
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const updateLikes = async () => {
    dispatch(likeBlog(blog));
  };

  const remove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog));
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setViewDetails(!viewDetails)}>
          {viewDetails ? "hide" : "view"}
        </button>
      </div>
      {viewDetails && (
        <div>
          <div className="blog-url">{blog.url}</div>
          <div className="blog-like">
            likes {blog.likes}
            <button onClick={updateLikes}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.name === user.name && (
            <button onClick={() => remove(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
