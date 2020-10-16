import React, { useState } from "react";
import Error from "./Error";
import Success from "./Successful";
import axios from "axios";
import Spinner from "./Spinner";

function Support() {
  const [msg, setMsg] = useState({
    username: "",
    email: "",
    text: "",
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(null);
  const inputHandler = (e) => {
    e.preventDefault();
    let key = e.target.name;
    let value = e.target.value;
    setMsg((prev) => ({ ...prev, [key]: value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const textt = await axios.patch("/users/message", msg);
      setResponse(textt.data);
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setResponse(error.response.data);
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div>
      {loading && <Spinner />}
      {success && (
        <Success
          response={response}
          setSuccess={() => {
            setSuccess(false);
            window.location.reload();
          }}
        />
      )}
      {error && (
        <Error
          response={response}
          setError={() => {
            setError(false);
            window.location.reload();
          }}
        />
      )}
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
            <div className="col-sm-6">
              <div className="main_title">
                <h3>Support</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bottom_body inner_page_body">
        <section className="common_page">
          <div className="container">
            <div className="inside_inner">
              <div style={{ margin: "0 0 30px" }}></div>
              <div className="support-right">
                {/* <div className="contacts">
                  <div className="address">
                    <h2>Company Details:</h2>
                    <h4
                      style={{
                        position: "relative ",
                        " left": "4px",
                        color: "#fff",
                      }}
                    >
                      Splashcash247 Limited
                    </h4>
                    <p>P2P Investment Platform for Financial growth</p>
                  </div>
                </div> */}
                <div className="contacts" style={{ width: "auto" }}>
                  <div className="email">
                    <h5 style={{ display: "inline-flex" }}>
                      E-mail:<span style={{ color: "white" }}> </span>
                    </h5>
                    <p>
                      <big> Support@splashcash247.com</big>
                    </p>
                    <h5 style={{ display: "inline-flex" }}>
                      WhatsApp:<span style={{ color: "white" }}> </span>
                    </h5>
                    <p>
                      <big> 09067306222</big>
                    </p>
                    <h5 style={{ display: "inline-flex" }}>
                      Telegram:<span style={{ color: "white" }}> </span>
                    </h5>
                    <p>
                      <big> https://t.me/joinchat/ReH8v1QQcJrKnMnvIo51-A</big>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="common_heading" style={{ marginTop: "30px" }}>
            Contact Form
          </h2>

          <div
            className="register_form_inner clearfix"
            style={{ width: "100%" }}
          >
            <div className="row">
              <form
                name="mainform"
                onSubmit={submitHandler}
                // action="https://formspree.io/f/meqpaepz"
                // method="POST"
              >
                <div className="col-sm-12 col-xs-12">
                  {" "}
                  <div className="col-sm-6 col-xs-6">
                    {" "}
                    <div className="form_box formsupport">
                      <span>
                        <i className="fa fa-user"></i>

                        <input
                          onChange={inputHandler}
                          placeholder="Username"
                          type="text"
                          name="username"
                          size="30"
                          className="inpts"
                          required
                        />
                      </span>
                    </div>{" "}
                  </div>
                  <div className="col-sm-6 col-xs-6">
                    {" "}
                    <div className="form_box formsupport">
                      <span>
                        <i className="fa fa-envelope"></i>

                        <input
                          onChange={inputHandler}
                          placeholder="Your Email"
                          type="email"
                          name="email"
                          size="30"
                          className="inpts"
                          required
                        />
                      </span>
                    </div>{" "}
                  </div>
                  <div className="form_box" style={{ width: "97.5%" }}>
                    <span>
                      <i className="fa  fa-list-alt"></i>

                      <textarea
                        onChange={inputHandler}
                        style={{ paddingTop: "5px" }}
                        placeholder="Your Message"
                        name="text"
                        className="inpts"
                        required
                      ></textarea>
                    </span>
                  </div>
                  <div className="form_box">
                    <b>
                      <input
                        className="btn btn-primary sbmt"
                        type="submit"
                        value="Send"
                      />
                    </b>
                  </div>
                </div>

                <div className="col-sm-6 col-xs-6"> </div>

                <div className="col-sm-12 col-xs-12"> </div>

                <div className="col-sm-12 col-xs-12"></div>
              </form>
            </div>
          </div>
        </section>
      </div>

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
  );
}

export default Support;
