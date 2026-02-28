import React from "react";
import { useNotification } from "../hooks";

function Notification() {
  const { notification } = useNotification();
  const style = {
    backgroundColor: "lightgray",
    borderColor: notification.color,
    borderStyle: "solid",
    borderWidth: "2px",
    borderRadius: "10px",
    padding: "0px 10px",
    marginBottom: "10px",
  };
  if (notification.message === null) {
    return null;
  }

  return (
    <div style={style}>
      <h3>{notification.message}</h3>
    </div>
  );
}

export default Notification;
