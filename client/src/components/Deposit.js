import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SelectAmount from "./SelectAmount";
import Ph from "./Ph";

function Dashboard({ match }) {
  const history = useHistory();
  const { ref } = match.params;
  const [confirmPass, setConfirmPass] = useState("Re-Confirm password");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [savedUser, setSavedUser] = useState("");
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "",
    upline: "ref",
    accountName: "",
    accountNo: "",
    bank: "",
  });
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(null);
  const [currentReceipt, setCurrentReceipt] = useState(null);
  const [errormsg, setErrormsg] = useState(false);
  const [file, setFile] = useState(null);
  const [day, setDay] = useState(null);
  const [uploadedFile, setUploadedFile] = useState({});
  const [selectAmount, setSelectAmount] = useState(0);
  // const { _id, name, isActivated, wantToCashout, wantToInvest, InvestAmt,
  //     updatedAt, pendingInvestAmt, pendingCashoutAmt } = u;

  // const inputHandler = (e) => {
  //     e.preventDefault();
  //     let key = e.target.name;
  //     let value = e.target.value;
  //     setUser((prev) => ({ ...prev, [key]: value }));
  // };

  // const submitHandler = (e) => {
  //     e.preventDefault();
  //     console.log(user)

  // };

  const fileSelecthandler = (e) => {
    const filename = e.target.files[0].name;
    const file = e.target.files[0];
    // setdefaultFileLabel(filename);
    console.log(filename);
    setFile(file);
    console.log(file);
  };
  const fileUploadHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    console.log("formdata: ", formData);
    try {
      const res = await axios.post("http://localhost:4000/uploads", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      axios
        .patch(`http://localhost:4000/receipts/popPath/${currentReceipt._id}`, {
          popPath: filePath,
        })
        .then((res) => {
          console.log("edit popPath successful!!", res.data);
        });
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) {
        console.log("there was a problem with the server");
      } else {
        console.log(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <header className="inner_page_header">
        <div className="header_top">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-6 col-xs-5">
                <div className="logo">
                  <a href="/dashboard">
                    <img
                      src="images/logo.png"
                      alt="logo"
                      className="img-responsive"
                    />
                  </a>
                  <ul></ul>
                </div>
              </div>
              <div className="col-md-5 col-sm-8 col-xs-3">
                <div className="header_top_middle"></div>
              </div>
              <div className="col-md-3 col-sm-4 col-xs-3">
                <div className="header_top_right">
                  <ul>
                    <li>
                      <a className="btn btn-default" href="/">
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="headermenu">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <nav className="navbar navbar-inverse">
                  <div className="navbar-header">
                    <h5>Main Menu</h5>
                    <button
                      type="button"
                      className="navbar-toggle"
                      data-toggle="collapse"
                      data-target="#myNavbar"
                    >
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                  </div>
                  <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav">
                      <li>
                        <a href="/">Home</a>
                      </li>
                      <li>
                        <a href="/about">About Us</a>
                      </li>
                      <li>
                        <a href="/faq">FAQ</a>
                      </li>

                      <li>
                        <a href="/support">Support</a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <section className="admin_body">
          <div className="container admin_menu" style={{ padding: "0px 0" }}>
            <div className="row">
              <div className="col-sm-12">
                <ul>
                  <li>
                    <a href="/dashboard" style={{ width: "80px" }}>
                      <i className="ti-dashboard"></i>
                      <span>Dashboard</span>
                    </a>
                  </li>
                  <li>
                    <a href="/deposit" style={{ width: "80px" }}>
                      <i className="ti-cloud"></i>
                      <span>Deposit</span>
                    </a>
                  </li>

                  <li>
                    <a href="/transactions" style={{ width: "80px" }}>
                      <i className="ti-briefcase"></i>
                      <span>Transactions</span>
                    </a>
                  </li>

                  <li>
                    <a href="/edit_account" style={{ width: "80px" }}>
                      <i className="ti-lock"></i>
                      <span>Account</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* <div
            className="container"
            style={{ marginTop: " 20px", marginBottom: "20px" }}
          >
            <div className="row">
              <div className="col-md-5 col-sm-12">
                <div className="admin_head_left"></div>
              </div>
              <div className="col-md-7 col-sm-12"></div>
            </div>
          </div> */}
          <SelectAmount />
          <Ph
            title="Please pay an activation fee to be activated"
            fileUpload={fileUploadHandler}
            fileSelect={fileSelecthandler}
            accountName={"gfjghfjh"}
            accountNumber={"mainguider.accountNumber"}
            bank={"mainguider.bank"}
            phone={"mainguider.phone"}
            amount={1000}
            duetime={time}
          />
        </section>

        <section className="secure">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div
                  className="owl-carousel secure_carousel owl-theme"
                  style={{ opacity: "1", display: "block" }}
                >
                  <div className="owl-wrapper-outer">
                    <div
                      className="owl-wrapper"
                      style={{
                        width: "4416px",
                        left: "0px",
                        display: "block",
                        transition: "all 0ms ease 0s",
                        transform: "translate3d(0px, 0px, 0px)",
                      }}
                    >
                      <div className="owl-item" style={{ width: "276px" }}>
                        <div className="item">
                          <div className="secure_inner">
                            <img
                              src="images/secure_icon_1.png"
                              alt="secure_icon"
                              className="img-responsive"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="owl-item" style={{ width: "276px" }}>
                        <div className="item">
                          <div className="secure_inner">
                            <img
                              src="images/secure_icon_2.png"
                              alt="secure_icon"
                              className="img-responsive"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="owl-item" style={{ width: "276px" }}>
                        <div className="item">
                          <div className="secure_inner">
                            <img
                              src="images/secure_icon_3.png"
                              alt="secure_icon"
                              className="img-responsive"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="owl-item" style={{ width: "276px" }}>
                        <div className="item">
                          <div className="secure_inner">
                            <img
                              src="images/secure_icon_4.png"
                              alt="secure_icon"
                              className="img-responsive"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="owl-item" style={{ width: "276px" }}>
                        <div className="item">
                          <div className="secure_inner">
                            <img
                              src="images/secure_icon_5.png"
                              alt="secure_icon"
                              className="img-responsive"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="owl-item" style={{ width: "276px" }}>
                        <div className="item">
                          <div className="secure_inner">
                            <img
                              src="images/secure_icon_6.png"
                              alt="secure_icon"
                              className="img-responsive"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="owl-item" style={{ width: "276px" }}>
                        <div className="item">
                          <div className="secure_inner">
                            <img
                              src="images/secure_icon_1.png"
                              alt="secure_icon"
                              className="img-responsive"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="owl-item" style={{ width: "276px" }}>
                        <div className="item">
                          <div className="secure_inner">
                            <img
                              src="images/secure_icon_2.png"
                              alt="secure_icon"
                              className="img-responsive"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="owl-controls clickable">
                    <div className="owl-pagination">
                      <div className="owl-page active">
                        <span className=""></span>
                      </div>
                      <div className="owl-page">
                        <span className=""></span>
                      </div>
                      <div className="owl-page">
                        <span className=""></span>
                      </div>
                      <div className="owl-page">
                        <span className=""></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <div className="footer_top">
            <div className="container">
              <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-8">
                  <div className="footer_menu">
                    <ul>
                      <li>
                        <a href="/">Home</a>
                      </li>
                      <li>
                        <a href="/about">About Us</a>
                      </li>
                      <li>
                        <a href="/faq">Faq</a>
                      </li>
                      <li>
                        <a href="/rules">Terms and Agreement</a>
                      </li>
                      <li>
                        <a href="/support">Support</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-2"></div>
              </div>
            </div>
          </div>
          <div className="footer_bottom">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <h6>© 2020 Splashcash247. All Rights Reserved.</h6>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </header>
    </div>
  );
}

export default Dashboard;
