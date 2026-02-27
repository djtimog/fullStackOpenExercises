import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import CreateBlog from "./components/CreateBlog";
import { useRef } from "react";
import { setNotification } from "./reducers/notification";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/loginForm";
import { initializeBlogs } from "./reducers/blogs";

const App = () => {
  const [user, setUser] = useState(null);
  const createBlogRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    const loggedUserData = JSON.parse(
      localStorage.getItem("loggedBlogListUser"),
    );

    if (loggedUserData) {
      setUser(loggedUserData);
      blogService.setToken(loggedUserData.token);
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedBlogListUser");
  };

  const createBlog = async (newBlog) => {
    const savedBlog = await blogService.create(newBlog);
    // setBlogs((prev) => [...prev, savedBlog]);
    dispatch(
      setNotification(
        `A new blog ${savedBlog.title} by ${savedBlog.author} added`,
        "green",
      ),
    );
  };

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id);

        // setBlogs(blogs.filter((b) => b.id !== blog.id));
        dispatch(
          setNotification(
            `Blog ${blog.title} by ${blog.author} removed`,
            "green",
          ),
        );
      } catch (error) {
        dispatch(
          setNotification(
            `Not authorised to remove blog: ${blog.title}`,
            "red",
          ),
        );
        console.log(error);
      }
    }
  };

  if (user === null) {
    return <LoginForm setUser={setUser} />;
  }

  return (
    <div>
      <Notification />
      <h2>Blogs</h2>
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>

      <Togglable label="create new blog" ref={createBlogRef}>
        <CreateBlog createBlog={createBlog} ref={createBlogRef} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} deleteBlog={deleteBlog} />
      ))}
    </div>
  );
};

export default App;
