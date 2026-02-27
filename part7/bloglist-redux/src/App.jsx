import { useEffect } from "react";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/loginForm";
import { initializeBlogs } from "./reducers/blogs";
import { initializeUser } from "./reducers/user";
import UserDisplay from "./components/UserDisplay";
import { setUser } from "./reducers/usersInfos";
import Home from "./pages/Home";
import Users from "./pages/users";
import { Routes, Route } from "react-router-dom";
import User from "./pages/User";
import Blog from "./pages/Blog";

const App = () => {
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
    dispatch(setUser());
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  if (user === null) {
    return <LoginForm />;
  }

  return (
    <div>
      <Notification />

      <UserDisplay user={user} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  );
};

export default App;
