import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";
import { setNotification } from "./notification";
const bloglistReducer = createSlice({
  name: "bloglist",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload;
    },
    rearrangeBlogs: (state) => {
      const newState = [...state].sort((a, b) => b.likes - a.likes);
      return newState;
    },
    addBlog: (state, action) => {
      return [...state, action.payload];
    },
    updateBlog: (state, action) => {
      return [
        ...state.map((blog) =>
          blog.id !== action.payload.id
            ? blog
            : { ...blog, likes: action.payload.likes },
        ),
      ];
    },
    removeBlog: (state, action) => {
      return [...state.filter((blog) => blog.id !== action.payload.id)];
    },
  },
});

const { setBlogs, rearrangeBlogs, addBlog, updateBlog, removeBlog } =
  bloglistReducer.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
    dispatch(rearrangeBlogs());
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(blog);
    dispatch(addBlog(newBlog));
    dispatch(
      setNotification(
        `A new blog ${newBlog.title} by ${newBlog.author} added`,
        "green",
      ),
    );
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogsService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    });
    dispatch(updateBlog(updatedBlog));
    dispatch(rearrangeBlogs());
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogsService.remove(blog.id);
      dispatch(removeBlog(blog));
      dispatch(
        setNotification(
          `Blog ${blog.title} by ${blog.author} removed`,
          "green",
        ),
      );
    } catch (error) {
      dispatch(
        setNotification(`Not authorised to remove blog: ${blog.title}`, "red"),
      );
      console.log(error);
    }
  };
};

export default bloglistReducer.reducer;
