import React from "react";
import { useState, useImperativeHandle } from "react";

function Togglable({ children, label, ref }) {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  useImperativeHandle(ref, () => ({ toggleVisibility }));
  return (
    <div>
      {visible && children}
      <button onClick={toggleVisibility}>{visible ? "cancel" : label}</button>
    </div>
  );
}

export default Togglable;
