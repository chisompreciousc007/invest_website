import React from "react";

function PhComponent({
  title,
  accountName,
  accountNumber,
  bank,
  phone,
  amount,
  time,
  fileSelect,
  fileUpload,
  pop,
  IdSet,
}) {
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
      <h4>{title}</h4>
      <h5 style={{ marginLeft: "0.5rem", marginBottom: "0.3rem" }}>
        Account Name:{accountName}
      </h5>
      <h5 style={{ marginLeft: "0.5rem", marginBottom: "0.3rem" }}>
        Account Number:{accountNumber}
      </h5>
      <h5 style={{ marginLeft: "0.5rem", marginBottom: "0.3rem" }}>
        bank:{bank}
      </h5>
      <h5 style={{ marginLeft: "0.5rem", marginBottom: "0.3rem" }}>
        Phone:{phone}
      </h5>
      <h5 style={{ marginLeft: "0.5rem", marginBottom: "0.3rem" }}>
        Amount:{amount}
      </h5>
      <h5 style={{ marginLeft: "0.5rem", marginBottom: "0.3rem" }}>
        You have until{" "}
        {
          time
          /* {` ${format(addHours(new Date(time), 8), "MMM-dd' 'hh:mm aaaa")} `} */
        }
        to make this Payment.
      </h5>
      <div
        className="row"
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginRight: "-15px",
          marginLeft: "-15px",
        }}
      >
        {pop == null ? (
          <div className="col-md-4 col-sm-6 col-12">
            <form onsubmit="return false">
              <div
                className="form-group"
                //   style={{
                //     background:
                //       "linear-gradient(45deg, rgba(248,186,18,1) 0%,rgba(167,80,37,1) 100%",
                //   }}
              >
                <div className="input-group mb-3">
                  <div className="custom-file">
                    <input
                      onClick={() => IdSet()}
                      type="file"
                      className="custom-file-input"
                      id="inputGroupFile02"
                      onChange={fileSelect}
                    />
                    {/* <label className="custom-file-label" htmlFor="inputGroupFile02" >{fileLabel}</label> */}
                  </div>
                  <div className="input-group-append">
                    <button
                      style={{ color: "black" }}
                      type="button"
                      className="btn btn-default"
                      id=""
                      onClick={fileUpload}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="col-md-4 col-sm-6 col-12">
            <div style={{ marginLeft: "0.5rem" }}>
              <span className="badge badge-success">POP Uploaded!!</span>
            </div>
            {/* <img
              style={{ marginLeft: "0.5rem" }}
              src={require(`../boostrapdashboard${pop}`)}
              style={{ height: "400px", width: "100%" }}
              alt="popslip"
            /> */}
          </div>
        )}
      </div>
    </div>
  );
}
export default PhComponent;
