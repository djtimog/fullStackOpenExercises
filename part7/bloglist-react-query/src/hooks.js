import { useContext } from "react";
import { NotificationContext } from "./context/notification";

export const useNotification = () => {
  const content = useContext(NotificationContext);
  return content;
};
