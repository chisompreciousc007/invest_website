import React, { useState } from "react";
import Error from "./Error";
import Success from "./Successful";
import axios from "axios";
import Spinner from "./Spinner";
import Footer2 from "./Footer2";
import Header2 from "./Header2";

function Support() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(null);

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
      <Header2 />

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
                      <big> Support@example.com</big>
                    </p>
                    <h5 style={{ display: "inline-flex" }}>
                      WhatsApp:<span style={{ color: "white" }}> </span>
                    </h5>
                    <p>
                      <big> +1234567890</big>
                    </p>
                    <h5 style={{ display: "inline-flex" }}>
                      Telegram:<span style={{ color: "white" }}> </span>
                    </h5>
                    <p>
                      <big> https://t.me</big>
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
                action="https://formspree.io/f/meqpaepz"
                method="POST"
              >
                <div className="col-sm-12 col-xs-12">
                  {" "}
                  <div className="col-sm-6 col-xs-6">
                    {" "}
                    <div className="form_box formsupport">
                      <span>
                        <i className="fa fa-user"></i>

                        <input
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
                          placeholder="Your Email"
                          type="email"
                          name="reply_to"
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

      <Footer2 />
    </div>
  );
}

export default Support;
