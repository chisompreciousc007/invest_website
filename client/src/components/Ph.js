import React from "react";
// import "bootswatch/dist/solar/bootstrap.min.css";

function PhComponent({
  title,
  accountName,
  accountNumber,
  bank,
  phone,
  amount,
  duetime,
  fileSelect,
  fileUpload,
  pop,
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
        You have 8 hours from
        {duetime}
        to make this Payment.
      </h5>
      <div
        class="row"
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginRight: "-15px",
          marginLeft: "-15px",
        }}
      >
        {pop === undefined ? (
          <div className="col-md-4 col-sm-6 col-12">
            <div
              class="form-group"
              //   style={{
              //     background:
              //       "linear-gradient(45deg, rgba(248,186,18,1) 0%,rgba(167,80,37,1) 100%",
              //   }}
            >
              <div class="input-group mb-3">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="inputGroupFile02"
                    onChange={fileSelect}
                  />
                  {/* <label class="custom-file-label" htmlFor="inputGroupFile02" >{fileLabel}</label> */}
                </div>
                <div class="input-group-append">
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
          </div>
        ) : (
          <div className="col-md-4 col-sm-6 col-12">
            <div style={{ marginLeft: "0.5rem" }}>
              <span class="badge badge-success">POP Uploaded!!</span>
            </div>
            <img
              style={{ marginLeft: "0.5rem" }}
              src={require(`../boostrapdashboard${pop}`)}
              style={{ height: "400px", width: "100%" }}
              alt="popslip"
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default PhComponent;
