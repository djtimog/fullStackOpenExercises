import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import userService from "./services/user";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import CreateBlog from "./components/CreateBlog";
import { useRef } from "react";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("green");
  const createBlogRef = useRef(null);
  const blogToShow = blogs.sort((a, b) => b.likes - a.likes);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserData = JSON.parse(
      localStorage.getItem("loggedBlogListUser"),
    );

    if (loggedUserData) {
      setUser(loggedUserData);
      blogService.setToken(loggedUserData.token);
    }
  }, []);

  const login = async (event) => {
    event.preventDefault();
    const userLogins = {
      username,
      password,
    };
    try {
      const userData = await userService.login(userLogins);
      setUser(userData);
      blogService.setToken(userData.token);
      localStorage.setItem("loggedBlogListUser", JSON.stringify(userData));
      setNotification(`Welcome back ${userData.name}`);
    } catch (error) {
      setNotification("Wrong username or password", "red");
      console.log(error);
      return;
    }
    setUsername("");
    setPassword("");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedBlogListUser");
  };

  const createBlog = async (newBlog) => {
    const savedBlog = await blogService.create(newBlog);
    setBlogs((prev) => [...prev, savedBlog]);
    setNotification(
      `A new blog ${savedBlog.title} by ${savedBlog.author} added`,
    );
  };

  const setNotification = (msg, color = "green") => {
    setColor(color);
    setMessage(msg);

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {message && <Notification color={color} message={message} />}
        <form onSubmit={login}>
          <div>
            <label>
              username
              <input
                type="text"
                id="username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      {message && <Notification color={color} message={message} />}
      <h2>Blogs</h2>
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>

      <Togglable label="create new blog" ref={createBlogRef}>
        <CreateBlog createBlog={createBlog} ref={createBlogRef} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blogToShow} />
      ))}
    </div>
  );
};

export default App;
