import React from "react";

const DisabledOption = ({ showDisabled, toggle }) => {
  return (
    <div>
      <input type="checkbox" name="showDisabled" value={showDisabled} checked={showDisabled} onChange={toggle} />
      <label htmlFor="discontinued" style={{ marginLeft: "10px" }}>
        Show Discontinued Products
      </label>
    </div>
  );
};

export default DisabledOption;
