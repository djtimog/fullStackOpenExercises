import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import userService from "./services/user";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import CreateBlog from "./components/CreateBlog";
import { useRef } from "react";
import { useNotification } from "./hooks";
import { useMutation, useQuery } from "@tanstack/react-query";

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const createBlogRef = useRef(null);
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const blogs = await blogService.getAll();
      return blogs;
    },
  });
  // const blogsToShow = blogs.sort((a, b) => b.likes - a.likes);
  const { dispatch } = useNotification();

  const blogMutation = useMutation({
    mutationFn: async (newBlog) => {
      const savedBlog = await blogService.create(newBlog);
      return savedBlog;
    },
    onSuccess: (savedBlog) => {
      const blogs = result.getQueryData(["blogs"]);
      result.setQueryData(["blogs"], [...blogs, savedBlog]);
      setNotification(
        `A new blog ${savedBlog.title} by ${savedBlog.author} added`,
      );
      createBlogRef.current.toggleVisibility();
    },
  });

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
    blogMutation.mutate(newBlog);
  };

  const setNotification = (msg, color = "green") => {
    dispatch({ type: "SET_NOTIFICATION", payload: { message: msg, color } });
  };

  // const deleteBlog = async (blog) => {
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
  //     try {
  //       await blogService.remove(blog.id);

  //       setBlogs(blogs.filter((b) => b.id !== blog.id));
  //       setNotification(`Blog ${blog.title} by ${blog.author} removed`);
  //     } catch (error) {
  //       setNotification(`Not authorised to remove blog: ${blog.title}`, "red");
  //       console.log(error);
  //     }
  //   }
  // };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
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
      <Notification />
      <h2>Blogs</h2>
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>

      <Togglable label="create new blog" ref={createBlogRef}>
        <CreateBlog createBlog={createBlog} ref={createBlogRef} />
      </Togglable>
      {result.data?.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
