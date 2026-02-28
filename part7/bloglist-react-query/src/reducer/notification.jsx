import { useReducer } from "react";
import { NotificationContext } from "../context/notification";
const initialState = { message: null, color: "green" };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return initialState;
    default:
      return state;
  }
};

const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(reducer, initialState);
  if (notification && notification.message) {
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
  }

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
