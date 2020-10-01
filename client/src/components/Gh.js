import React, { useState } from "react";

function GHComponent({
  title,
  name,
  phone,
  amount,
  duetime,
  confirm,
  purge,
  pop,
  IdSet,
}) {
  const [button, setbutton] = useState(false);
  const working = () => IdSet();

  return (
    <div className="bg-primary mt-3 text-white text-left">
      <h3 className="ml-2">Name:{title}</h3>
      <h5 className="ml-2">Name:{name}</h5>
      <h5 className="ml-2">Phone:{phone}</h5>
      <h5 className="ml-2">Amount:{amount}</h5>
      <h5 className="ml-2">Due time:{duetime}</h5>

      <button
        type="button"
        className="btn btn-success"
        onClick={() => {
          setbutton(true);
          working();
        }}
      >
        Confirm
      </button>
      <button type="button" className="btn btn-danger" onClick={purge}>
        Purge
      </button>

      {button ? (
        <div className="ml-2">
          <p>
            Are you Sure ?{" "}
            <button type="button" className="btn btn-success" onClick={confirm}>
              Yes
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => setbutton(false)}
            >
              No
            </button>{" "}
          </p>
        </div>
      ) : null}
      <div className="row">
        {pop !== undefined ? (
          <div className="col-md-4 col-sm-6 col-12  ml-2">
            {" "}
            <img
              src={require(`../../public/uploads/${pop}`)}
              style={{ height: "400px", width: "100%" }}
              alt="image"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default GHComponent;
