import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, deleteBlog }) => {
  const [blogDetails, setBlogDetails] = useState(blog);
  const [viewDetails, setViewDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const updateLikes = async () => {
    const updatedBlog = {
      ...blogDetails,
      likes: blogDetails.likes + 1,
    };
    const data = await blogService.update(blog.id, updatedBlog);
    setBlogDetails(data);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blogDetails.title} {blogDetails.author}
        <button onClick={() => setViewDetails(!viewDetails)}>
          {viewDetails ? "hide" : "view"}
        </button>
      </div>
      {viewDetails && (
        <div>
          <div className="blog-url">{blogDetails.url}</div>
          <div className="blog-like">
            likes {blogDetails.likes}
            <button onClick={updateLikes}>like</button>
          </div>
          <div>{blogDetails.user.name}</div>
          <button onClick={() => deleteBlog(blog)}>remove</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
