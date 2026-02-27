import { useSelector } from "react-redux";

function Notification() {
  const notification = useSelector((state) => state.notification);
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
