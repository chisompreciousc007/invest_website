import React from "react";

function Success({ savedUser, history }) {
  return (
    <div
      class="alert alert-dismissible alert-success position-fixed mt-4 w-50 p-3"
      style={{
        zIndex: "999",
        left: "10%",
        position: "absolute",
        top: "10%",
        width: "70%",
        color: "#032504",
      }}
    >
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        onClick={() => history.push("/login")}
      >
        &times;
      </button>
      <h4 class="alert-heading">Registration Successful!</h4>
      <p class="mb-0">hello {savedUser}, Please Sign In to Continue</p>
    </div>
  );
}

export default Success;
