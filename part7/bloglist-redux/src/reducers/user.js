import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";
import blogsService from "../services/blogs";
import { setNotification } from "./notification";

const userReducer = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    initializeUser: (state, action) => {
      return action.payload;
    },
    changeUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { initializeUser, changeUser } = userReducer.actions;

export const loginUser = (userLogins) => {
  return async (dispatch) => {
    try {
      const user = await userService.login(userLogins);
      dispatch(initializeUser(user));
      blogsService.setToken(user.token);
      localStorage.setItem("loggedBlogListUser", JSON.stringify(user));
      dispatch(setNotification(`Welcome back ${user.name}`, "green"));
    } catch (error) {
      dispatch(setNotification("Wrong username or password", "red"));
      console.log(error);
      return;
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(changeUser(null));
    localStorage.removeItem("loggedBlogListUser");
  };
};

export default userReducer.reducer;
