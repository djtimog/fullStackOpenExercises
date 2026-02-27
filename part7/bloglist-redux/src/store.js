import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notification";
import blogsReducer from "./reducers/blogs";
import userReducer from "./reducers/user";
import usersInfosReducer from "./reducers/usersInfos";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    usersInfos: usersInfosReducer,
  },
});

export default store;
