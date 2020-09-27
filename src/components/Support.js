import React from "react";

function Support() {
  return (
    <div>
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
        <section class="common_page">
          <div class="container">
            <div class="inside_inner">
              <div style={{ margin: "0 0 30px" }}></div>
              <div class="support-right">
                <div class="contacts">
                  <div class="address">
                    <h2>Company Details:</h2>
                    <h4
                      style={{
                        position: "relative ",
                        " left": "4px",
                        color: "#fff",
                      }}
                    >
                      Tesla Mining Limited
                    </h4>
                    <p>12 Queensway, London, United Kingdom, W2 4QJ</p>
                  </div>
                </div>
                <div class="contacts">
                  <div class="email">
                    <h2 style={{ display: "inline-flex" }}>
                      Our E-mail:<span style={{ color: "white" }}> </span>
                    </h2>
                    <p>
                      <big> Support@teslamining.ltd</big>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 class="common_heading" style={{ marginTop: "190px" }}>
            Contact Form
          </h2>

          <div class="register_form_inner clearfix" style={{ width: "100%" }}>
            <div class="row">
              <form method="post" name="mainform">
                <div class="col-sm-12 col-xs-12">
                  {" "}
                  <div class="col-sm-6 col-xs-6">
                    {" "}
                    <div class="form_box formsupport">
                      <span>
                        <i class="fa fa-user"></i>

                        <input
                          placeholder="Username"
                          type="text"
                          name="name"
                          value=""
                          size="30"
                          class="inpts"
                        />
                      </span>
                    </div>{" "}
                  </div>
                  <div class="col-sm-6 col-xs-6">
                    {" "}
                    <div class="form_box formsupport">
                      <span>
                        <i class="fa fa-envelope"></i>

                        <input
                          placeholder="Your Email"
                          type="email"
                          name="email"
                          value=""
                          size="30"
                          class="inpts"
                        />
                      </span>
                    </div>{" "}
                  </div>
                  <div class="form_box" style={{ width: "97.5%" }}>
                    <span>
                      <i class="fa  fa-list-alt"></i>

                      <textarea
                        style={{ paddingTop: "5px" }}
                        placeholder="Your Message"
                        name="message"
                        class="inpts"
                      ></textarea>
                    </span>
                  </div>
                  <div class="form_box">
                    <b>
                      <input
                        class="btn btn-primary"
                        type="submit"
                        value="Send"
                        class="sbmt"
                      />
                    </b>
                  </div>
                </div>

                <div class="col-sm-6 col-xs-6"> </div>

                <div class="col-sm-12 col-xs-12"> </div>

                <div class="col-sm-12 col-xs-12"></div>
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
              <div className="col-sm-2">
                <div className="payment">
                  <img
                    src="images/bitcoin_logo.png"
                    alt="bitcoin_logo"
                    className="img-responsive"
                  />
                  <span>Accepted Here</span>
                </div>
              </div>
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
              <div className="col-sm-2">
                <div className="footer_logo">
                  <img
                    src="images/logo.png"
                    alt="footer_logo"
                    className="img-responsive"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_bottom">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h6>© 2020 Tesla Mining Limited. All Rights Reserved.</h6>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Support;
