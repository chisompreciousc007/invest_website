import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Dashboard({ match }) {
  // const history = useHistory();
  // const { ref } = match.params;
  // const [confirmPass, setConfirmPass] = useState('Re-Confirm password');
  // const [response, setResponse] = useState("");
  // const [error, setError] = useState(false);
  // const [success, setSuccess] = useState(false);
  // const [savedUser, setSavedUser] = useState("");
  // const [user, setUser] = useState({
  //     name: "",
  //     username: "",
  //     email: "",
  //     password: "",
  //     phone: "",
  //     age: "",
  //     gender: "",
  //     upline: "ref",
  //     accountName: "",
  //     accountNo: "",
  //     bank: ""

  // });

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

          <div
            className="container"
            style={{ marginTop: " 20px", marginBottom: "20px" }}
          >
            <div className="row">
              <div className="col-md-5 col-sm-12">
                <div className="admin_head_left">
                  <h4>
                    Hello, testuser3
                    <span>
                      Your referral
                      link:https://splashcash247.com/signup=testuser3
                    </span>
                  </h4>
                </div>
              </div>
              <div className="col-md-7 col-sm-12"></div>
            </div>

            <div className="currency_hashrate">
              <div className="container">
                <h2 className="common_heading">Your account</h2>
                <div
                  className="row"
                  style={{
                    width: "80%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <div className="col-sm-6">
                    <div className="summary_box">
                      <h3>Investment</h3>
                      <h4>
                        Ƀ<b id="total_balance">0.00000000</b>
                      </h4>

                      <small></small>

                      <span>
                        Account Balance: Ƀ<b>0.00000000</b> &nbsp;
                      </span>
                      <h4>
                        <span>
                          Earned Total: Ƀ<b id="total_profit">0.00000000</b>
                        </span>
                      </h4>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="summary_box">
                      <h3>Profit</h3>
                      <h4>
                        Ƀ<b>0.00000000</b>
                        <span>
                          Total Contracts: Ƀ<b>0.00000000</b>
                        </span>
                        <span>
                          Last Contarcts: <b>n/a</b> &nbsp;
                        </span>
                      </h4>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="summary_box">
                      <h3>Investment</h3>
                      <h4>
                        Ƀ<b id="total_balance">0.00000000</b>
                      </h4>

                      <small></small>

                      <span>
                        Account Balance: Ƀ<b>0.00000000</b> &nbsp;
                      </span>
                      <h4>
                        <span>
                          Earned Total: Ƀ<b id="total_profit">0.00000000</b>
                        </span>
                      </h4>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="summary_box">
                      <h3>Profit</h3>
                      <h4>
                        Ƀ<b>0.00000000</b>
                        <span>
                          Total Contracts: Ƀ<b>0.00000000</b>
                        </span>
                        <span>
                          Last Contarcts: <b>n/a</b> &nbsp;
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hash_power_content">
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <div className="hashpower_left">
                    <h2>Deposit</h2>
                    <a className="btn btn-white" href="?a=deposit">
                      Click Here
                    </a>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="hashpower_right">
                    <h2>Withdraw</h2>
                    <a className="btn btn-primary" href="?a=withdraw">
                      Click Here
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
