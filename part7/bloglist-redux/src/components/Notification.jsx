import React from "react";

function Notification({ color, message }) {
  const style = {
    backgroundColor: "lightgray",
    borderColor: color,
    borderStyle: "solid",
    borderWidth: "2px",
    borderRadius: "10px",
    padding: "0px 10px",
    marginBottom: "10px",
  };

  return (
    <div style={style}>
      <h3>{message}</h3>
    </div>
  );
}

export default Notification;
