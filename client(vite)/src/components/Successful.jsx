import React from "react";

function Error({ response, setSuccess }) {
  return (
    <div
      className="alert alert-dismissible alert-success position-fixed mt-4 w-50 p-3"
      style={{
        zIndex: "999",
        left: "5%",
        position: "fixed",
        top: "45%",
        width: "70%",
      }}
    >
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        onClick={setSuccess}
      >
        &times;
      </button>
      <h4 className="alert-heading">Successful!!</h4>
      <p className="mb-0">{response} </p>
    </div>
  );
}

export default Error;
