import { useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";

function Notification() {
  const notification = useSelector((state) => state.notification);
  const variant = notification.color === "red" ? "danger" : "success";
  if (notification.message === null) {
    return null;
  }

  return <Alert variant={variant}>{notification.message}</Alert>;
}

export default Notification;
