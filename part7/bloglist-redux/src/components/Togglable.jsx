import React from "react";
import { useState, useImperativeHandle } from "react";
import Button from "react-bootstrap/Button";

function Togglable({ children, label, ref }) {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  useImperativeHandle(ref, () => ({ toggleVisibility }));
  return (
    <div className="mb-3">
      {visible && children}
      <Button variant="outline-secondary" onClick={toggleVisibility}>
        {visible ? "cancel" : label}
      </Button>
    </div>
  );
}

export default Togglable;
