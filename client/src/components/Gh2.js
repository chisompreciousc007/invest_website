import React, { useState } from "react";
import { addHours, format } from "date-fns";

function PhComponent({
  name,
  phone,
  amount,
  time,
  confirm,
  purge,
  pop,
  IdSet,
}) {
  const [button, setbutton] = useState(false);
  const working = () => IdSet();
  return (
    <div
      style={{
        background:
          "linear-gradient(45deg, rgba(248,186,18,1) 0%,rgba(167,80,37,1) 100%",
        // backgroundColor: "#b58900",
        textAlign: "left",
        color: "black",
        margin: "5px",
        borderRadius: "5px",
        fontWeight: "bolder",
      }}
    >
      <h4>You have been matched to GH</h4>
      <h5 style={{ marginLeft: "0.5rem", marginBottom: "0.3rem" }}>
        Name:{name}
      </h5>
      <h5 style={{ marginLeft: "0.5rem", marginBottom: "0.3rem" }}>
        Phone:{phone}
      </h5>
      <h5 style={{ marginLeft: "0.5rem", marginBottom: "0.3rem" }}>
        Amount:{amount}
      </h5>
      <h5 style={{ marginLeft: "0.5rem", marginBottom: "0.3rem" }}>
        You have until{" "}
        {` ${format(addHours(new Date(time), 8), "MMM-dd' 'hh:mm aaaa")} `}
        to recieve this Payment or Purge User.
      </h5>
      <div className="row">
        <div className="col-sm-6 col-xs-12">
          {" "}
          <button
            style={{ background: "green" }}
            className="btn btn-success"
            onClick={() => {
              setbutton(true);
              working();
            }}
          >
            Confirm
          </button>
          <button
            style={{ background: "red" }}
            className="btn btn-danger"
            onClick={purge}
          >
            Purge
          </button>
        </div>
      </div>

      {button ? (
        <div className="ml-2">
          <p>
            Are you Sure ?{" "}
            <button
              style={{ background: "green" }}
              type="button"
              className="btn btn-success"
              onClick={confirm}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => setbutton(false)}
              style={{ background: "red" }}
            >
              No
            </button>{" "}
          </p>
        </div>
      ) : null}

      {pop == null ? (
        <p>No POP available</p>
      ) : (
        <div className="row">
          <div className="col-md-4 col-sm-6 col-xs-12  ml-2">
            {" "}
            <img
              src={require(`../../public/uploads/${pop}`)}
              style={{ height: "400px", width: "100%" }}
              alt="pop"
            />
          </div>{" "}
        </div>
      )}
    </div>
  );
}
export default PhComponent;
