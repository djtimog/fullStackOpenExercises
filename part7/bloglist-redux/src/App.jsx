import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import CreateBlog from "./components/CreateBlog";
import { useRef } from "react";
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
        <CreateBlog ref={createBlogRef} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default App;
