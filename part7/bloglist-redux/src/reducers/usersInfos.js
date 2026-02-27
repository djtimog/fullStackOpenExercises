import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";

const usersInfosReducer = createSlice({
  name: "usersInfos",
  initialState: [],
  reducers: {
    initializeUsers: (state, action) => {
      return action.payload;
    },
  },
});
const { initializeUsers } = usersInfosReducer.actions;

export const setUser = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(initializeUsers(users));
  };
};

export default usersInfosReducer.reducer;
