import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Spinner from "./Spinner";
import Error from "./Error";
import Success from "./Success";

function SignUp({ match }) {
  const history = useHistory();
  const { ref } = match.params;
  const [confirmPass, setConfirmPass] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState(null);
  const [emailStatus, setEmailStatus] = useState(null);
  const [phoneStatus, setPhoneStatus] = useState(null);
  const [success, setSuccess] = useState(true);
  const [savedUser, setSavedUser] = useState("");
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "",
    upline: "none",
    accountName: "",
    accountNo: "",
    bank: "",
  });

  const inputHandler = (e) => {
    e.preventDefault();
    let key = e.target.name;
    let value = e.target.value;
    setUser((prev) => ({ ...prev, [key]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(user);
    // axios
    //     .post("http://localhost:4000/user/add", user)
    //     .then((res) => {
    //         console.log(res.data);
    //         const resUser = res.data.name;
    //         setSavedUser(resUser);
    //         setSuccess(true)
    //     })
    //     .catch((err) => {
    //         setError(true);
    //         const errmsg = err.response.data;
    //         console.log(typeof errmsg);
    //         setResponse(errmsg)
    //     });
  };

  const checkIfExist = (key) => {
    switch (key) {
      case "username":
        axios
          .post("http://localhost:4000/user/username", user)
          .then((res) => {
            console.log(res.data);
            // const resUser = res.data.name;
            // setSavedUser(resUser);
            // setSuccess(true)
          })
          .catch((err) => {
            setError(true);
            const errmsg = err.response.data;
            console.log(typeof errmsg);
            setResponse(errmsg);
          });

        break;

      default:
        break;
    }
    console.log(user);
  };

  return (
    <div>
      {error ? (
        <Error
          response={response}
          setError={() => {
            setError(false);
            window.location.reload();
          }}
        />
      ) : null}
      {success ? <Success savedUser={savedUser} history={history} /> : null}

      <header className="inner_page_header">
        <div className="header_top">
          <div className="container">
            <div className="row">
              <div className=" col-sm-3 col-xs-5">
                <div className="logo">
                  <a href="/">
                    <img
                      src="images/logo.png"
                      alt="logo"
                      className="img-responsive"
                    />
                  </a>
                </div>
              </div>
              <div className=" col-sm-3 col-xs-1">
                <div className="header_top_middle"></div>
              </div>
              <div className=" col-sm-6 col-xs-6">
                <div className="header_top_right" style={{ marginTop: "2px" }}>
                  <ul>
                    <li>
                      <a className="btn btn-default" href="/login">
                        Login
                      </a>
                    </li>
                    <li>
                      <a className="btn btn-primary" href="/signup=new">
                        Signup
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
                      style={{
                        position: "absolute",
                        top: "-89px",
                        right: "0px",
                      }}
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
      </header>

      <section className="inner_page_heading">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-xs-12">
              <div className="main_title">
                <h3>Registration</h3>
              </div>
            </div>
            <div className="col-sm-6 col-xs-0"></div>
          </div>
        </div>
      </section>

      <div className="bottom_body inner_page_body">
        <section className="common_page">
          <div className="container">
            <h2 className="common_heading">Signup and get instant access</h2>

            <div
              className="register_form_inner clearfix"
              style={{ marginLeft: "0px" }}
            >
              <div className="row">
                <div className="col-md-10 col-md-offset-1">
                  <div className="row">
                    <form name="regform" onSubmit={submitHandler}>
                      <div className="col-sm-12 col-xs-12">
                        <div className="form_box" style={{ width: "340px" }}>
                          <span>
                            <i className="fa fa-user" aria-hidden="true"></i>
                            <input
                              pattern="[a-zA-Z]"
                              minLength="8"
                              maxLength="50"
                              required
                              placeholder="Your Fullname"
                              type="text"
                              name="name"
                              className="inpts"
                              size="30"
                              onChange={inputHandler}
                            />
                          </span>
                        </div>
                      </div>

                      <div className="col-sm-12 col-xs-12">
                        <div className="form_box" style={{ width: "340px" }}>
                          <p style={{ color: "white" }}>
                            {" "}
                            <small>{usernameStatus}</small>{" "}
                          </p>
                          <span>
                            <i className="fa fa-user" aria-hidden="true"></i>
                            <input
                              pattern="[a-zA-Z0-9]+"
                              minLength="4"
                              maxLength="15"
                              required
                              placeholder="Username"
                              type="text"
                              name="username"
                              className="inpts"
                              size="30"
                              onChange={inputHandler}
                              onBlur={() => {}}
                            />
                          </span>
                        </div>
                      </div>

                      <div className="col-sm-12 col-xs-12">
                        <div className="form_box" style={{ width: "340px" }}>
                          <p style={{ color: "white" }}>
                            {" "}
                            <small>{emailStatus}</small>{" "}
                          </p>
                          <span>
                            <i className="fa fa-envelope"></i>
                            <input
                              onBlur={() => console.log("left username input")}
                              required
                              placeholder="Your E-mail Address"
                              type="email"
                              name="email"
                              className="inpts"
                              size="30"
                              onChange={inputHandler}
                              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            />
                          </span>
                        </div>
                      </div>

                      <div className="col-sm-12 col-xs-12">
                        <div className="form_box" style={{ width: "340px" }}>
                          <span>
                            <i
                              className="fa fa-unlock-alt"
                              aria-hidden="true"
                            ></i>
                            <input
                              required
                              placeholder="Your Password"
                              type="password"
                              name="password"
                              className="inpts"
                              size="30"
                              onChange={inputHandler}
                            />
                          </span>
                        </div>
                      </div>

                      <div className="col-sm-12 col-xs-12">
                        <div className="form_box" style={{ width: "340px" }}>
                          <p style={{ color: "white" }}>{confirmPass}</p>
                          <span>
                            <i
                              className="fa fa-unlock-alt"
                              aria-hidden="true"
                            ></i>
                            <input
                              required
                              placeholder="Re-Confirm Password"
                              type="password"
                              name="password2"
                              className="inpts"
                              size="30"
                              onChange={(e) =>
                                e.target.value === user.password
                                  ? setConfirmPass("Password Match!!")
                                  : setConfirmPass(
                                      "Password does not match, Please try again!"
                                    )
                              }
                            />
                          </span>
                        </div>
                      </div>

                      <div className="col-sm-12 col-xs-12">
                        <div className="form_box" style={{ width: "340px" }}>
                          <p style={{ color: "white" }}>
                            {" "}
                            <small>{phoneStatus}</small>{" "}
                          </p>
                          <span>
                            <i className="fa fa-phone" aria-hidden="true"></i>
                            <input
                              pattern="[0-9]+"
                              minLength="11"
                              maxLength="15"
                              required
                              placeholder="Your Phone Number"
                              type="text"
                              name="phone"
                              className="inpts"
                              size="30"
                              onChange={inputHandler}
                            />
                          </span>
                        </div>
                      </div>

                      <div className="col-sm-12 col-xs-12">
                        <div className="form_box" style={{ width: "340px" }}>
                          <span>
                            <i className="fa fa-usd" aria-hidden="true"></i>
                            <input
                              pattern="[a-zA-Z]+"
                              minLength="8"
                              maxLength="50"
                              required
                              placeholder="Your Bank Account Name"
                              type="text"
                              name="accountName"
                              className="inpts"
                              size="30"
                              onChange={inputHandler}
                            />
                          </span>
                        </div>
                      </div>

                      <div className="col-sm-12 col-xs-12">
                        <div className="form_box" style={{ width: "340px" }}>
                          <span>
                            <i className="fa fa-usd" aria-hidden="true"></i>
                            <input
                              pattern="[0-9]+"
                              minLength="7"
                              maxLength="15"
                              required
                              placeholder="Your Bank Account Number"
                              type="text"
                              name="accountNo"
                              className="inpts"
                              size="30"
                              onChange={inputHandler}
                            />
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-12 col-xs-12">
                        <div className="form_box" style={{ width: "340px" }}>
                          <span>
                            <i className="fa fa-usd" aria-hidden="true"></i>
                            <input
                              pattern="[a-zA-Z]+"
                              minLength="3"
                              maxLength="15"
                              required
                              placeholder="Your Bank"
                              type="text"
                              name="bank"
                              className="inpts"
                              size="30"
                              onChange={inputHandler}
                            />
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-12 col-xs-12">
                        <div className="form_box" style={{ width: "340px" }}>
                          <span>
                            <i className="fa fa-user" aria-hidden="true"></i>
                            <input
                              pattern="[a-zA-Z0-9]"
                              minLength="4"
                              maxLength="15"
                              required
                              placeholder={
                                ref === "new" ? "Enter Referal Username" : ref
                              }
                              type="text"
                              name="upline"
                              className="inpts"
                              size="30"
                            />
                          </span>
                        </div>
                      </div>

                      <div className="col-sm-12 col-xs-12">
                        <div className="form_box">
                          <aside>
                            <input
                              disabled
                              required
                              type="checkbox"
                              name="agree"
                              value="1"
                              defaultChecked
                            />{" "}
                            I agree with{" "}
                            <a href="/terms">Terms and conditions</a>
                          </aside>{" "}
                        </div>{" "}
                      </div>

                      <div className="col-sm-12 col-xs-12">
                        <div className="form_box">
                          <b>
                            {" "}
                            <input
                              className="btn btn-primary"
                              type="submit"
                              value="Signup !"
                            />
                          </b>
                        </div>
                      </div>

                      <div className="col-sm-12 col-xs-12">
                        {" "}
                        <div className="form_box"></div>
                      </div>
                    </form>
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
                <div className="owl-carousel secure_carousel">
                  <div className="item">
                    <div className="secure_inner">
                      <img
                        src="images/secure_icon_1.png"
                        alt="secure_icon"
                        className="img-responsive"
                      />
                    </div>
                  </div>
                  <div className="item">
                    <div className="secure_inner">
                      <img
                        src="images/secure_icon_2.png"
                        alt="secure_icon"
                        className="img-responsive"
                      />
                    </div>
                  </div>
                  <div className="item">
                    <div className="secure_inner">
                      <img
                        src="images/secure_icon_3.png"
                        alt="secure_icon"
                        className="img-responsive"
                      />
                    </div>
                  </div>
                  <div className="item">
                    <div className="secure_inner">
                      <img
                        src="images/secure_icon_4.png"
                        alt="secure_icon"
                        className="img-responsive"
                      />
                    </div>
                  </div>
                  <div className="item">
                    <div className="secure_inner">
                      <img
                        src="images/secure_icon_5.png"
                        alt="secure_icon"
                        className="img-responsive"
                      />
                    </div>
                  </div>
                  <div className="item">
                    <div className="secure_inner">
                      <img
                        src="images/secure_icon_6.png"
                        alt="secure_icon"
                        className="img-responsive"
                      />
                    </div>
                  </div>
                  <div className="item">
                    <div className="secure_inner">
                      <img
                        src="images/secure_icon_1.png"
                        alt="secure_icon"
                        className="img-responsive"
                      />
                    </div>
                  </div>
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
                  <h6>© 2020 SplashCash247 Ltd. All Rights Reserved.</h6>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default SignUp;
