import React from "react";

function Error({ response, setError }) {
  return (
    <div
      className="alert alert-dismissible alert-danger position-fixed mt-4 w-50 p-3"
      style={{
        zIndex: "999",
        left: "10%",
        position: "absolute",
        top: "10%",
        width: "70%",
      }}
    >
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        onClick={setError}
      >
        &times;
      </button>
      <h4 className="alert-heading">Oops! omething went wrong</h4>
      <p className="mb-0">{response} </p>
    </div>
  );
}

export default Error;
