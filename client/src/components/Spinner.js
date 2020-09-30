import React from "react";
function Spinner() {
  return (
    <div
      className="lds-roller"
      style={{
        zIndex: "999",
        left: "30%",
        position: "absolute",
        top: "10%",
        width: "30%",
      }}
    >
      <div></div>
      <div></div>
    </div>
  );
}
export default Spinner;
