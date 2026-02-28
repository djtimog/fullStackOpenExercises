import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  // const remove = async () => {
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
  //     dispatch(deleteBlog(blog));
  //   }
  // };

  return (
    <div className="blog">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  );
};

export default Blog;
