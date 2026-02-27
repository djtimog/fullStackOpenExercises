import { createSlice } from "@reduxjs/toolkit";

const initailState = { message: null, color: null };

const notificationSlice = createSlice({
  name: "notification",
  initialState: initailState,
  reducers: {
    stateNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return initailState;
    },
  },
});

const { stateNotification, clearNotification } = notificationSlice.actions;
const setNotification = (message, color) => {
  return (dispatch) => {
    dispatch(stateNotification({ message, color }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 3000);
  };
};

export { setNotification };

export default notificationSlice.reducer;
