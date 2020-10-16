import React from "react";
function Spinner() {
  return (
    <div
      className="lds-roller"
      style={{
        zIndex: "999",
        left: "45%",
        position: "fixed",
        top: "45%",
        width: "30%",
      }}
    >
      <div></div>
      <div></div>
    </div>
  );
}
export default Spinner;
