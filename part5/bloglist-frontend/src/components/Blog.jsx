import { useState } from "react";

const Blog = ({ blog }) => {
  const [viewDetails, setViewDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setViewDetails(!viewDetails)}>
          {viewDetails ? "hide" : "view"}
        </button>
      </div>
      {viewDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button>likes</button>
          </div>
          <div>{blog.user.name}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
