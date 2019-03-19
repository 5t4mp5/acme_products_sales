import React from "react";

const Message = ({ type, text, resetMessage }) => {
  return (
    <div
      className={`alert alert-${type}`}
      role="alert"
      style={{ marginTop: "20px" }}
    >
      {text}
        <button
          type="button"
          style={{ width: "30px", height: "30px", position: "absolute", right: "10px", top: "10px" }}
          onClick={() => resetMessage()}
        >
          X
        </button>
    </div>
  );
};

export default Message;
