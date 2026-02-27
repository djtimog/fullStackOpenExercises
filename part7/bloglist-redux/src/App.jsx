import { useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import CreateBlog from "./components/CreateBlog";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/loginForm";
import { initializeBlogs } from "./reducers/blogs";
import { initializeUser } from "./reducers/user";
import UserDisplay from "./components/UserDisplay";

const App = () => {
  const createBlogRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserData = JSON.parse(
      localStorage.getItem("loggedBlogListUser"),
    );

    if (loggedUserData) {
      dispatch(initializeUser(loggedUserData));
      blogService.setToken(loggedUserData.token);
    }

    dispatch(initializeBlogs());
  }, [dispatch]);

  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  if (user === null) {
    return <LoginForm />;
  }

  return (
    <div>
      <Notification />

      <UserDisplay user={user} />

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
