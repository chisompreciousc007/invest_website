import React from "react";

function Success({ savedUser, history }) {
  return (
    <div
      className="alert alert-dismissible alert-success position-fixed mt-4 w-50 p-3"
      style={{
        zIndex: "999",
        left: "5%",
        position: "fixed",
        top: "45%",
        width: "70%",
        color: "#032504",
      }}
    >
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        onClick={() => history.push("/login")}
      >
        &times;
      </button>
      <h4 className="alert-heading">Registration Successful!</h4>
      <p className="mb-0">hello {savedUser}, Please Sign In to Continue</p>
    </div>
  );
}

export default Success;
