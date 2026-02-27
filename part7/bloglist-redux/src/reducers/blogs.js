import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";
const bloglistReducer = createSlice({
  name: "bloglist",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload;
    },
    rearrangeBlogs: (state) => {
      return [...state.sort((a, b) => b.likes - a.likes)];
    },
  },
});

const { setBlogs, rearrangeBlogs } = bloglistReducer.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
    dispatch(rearrangeBlogs());
  };
};

export default bloglistReducer.reducer;
