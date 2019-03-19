import React from "react";

const Message = ({ type, text }) => {
  return (
    <div
      className={`alert alert-${type}`}
      role="alert"
      style={{ marginTop: "20px" }}
    >
    {text}
    </div>
  );
};

export default Message;
