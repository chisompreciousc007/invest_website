import React from "react";

function About() {
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
                <h3>About Us</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bottom_body inner_page_body">
        <section className="index_about">
          <div className="container">
            <div className="index_about_inner" style={{background:"#0e010100"}}>
              <div className="row">
                <div className="col-sm-12">
                  <h2 className="common_heading">Welcome to Splashcash247</h2>
                </div>
                <div className="col-sm-7">
                  <div className="about_left">
                    <p>
                      SplashCash247 was born in 2020 to give users an amazing,
                      safe and reliable P2P platform. The ease and features of
                      the website have enhanced our customer base to significant
                      level. Our company is managed by proficient personnels
                      comprising brilliant programmers and engineers. With our
                      experience in Money Management, we have realized the need
                      of safe, effective and prompt P2P system. Consequently, we
                      came up with the advanced technology to make P2P
                      Investment Secure and accessible to all regardless of
                      their age, location, budget or technical knowledge. Try
                      the future digital investment with us now.
                    </p>
                  </div>
                </div>
                <div className="col-sm-5">
                  <div
                    className="about_right"
                    style={{ marginTop: "55px" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="work_process">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-6 col-xs-6">
                <div className="work_process_box">
                  <div className="work_process_box_inner">
                    <img
                      src="images/wrkprcsicn1.png"
                      alt="wrkprcsicn1"
                      className="img-responsive"
                    />
                    <h5>Dedicated and Secure Server</h5>
                    <p>
                      We have dedicated servers to ensure the security of your
                      <br />
                      funds...
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-xs-6">
                <div className="work_process_box">
                  <div className="work_process_box_inner">
                    <img
                      src="images/wrkprcsicn2.png"
                      alt="wrkprcsicn1"
                      className="img-responsive"
                    />
                    <h5>Easy GH/PH</h5>
                    <p>
                      It is easy to PH and GH with our simple web design
                      <br />
                      One Click and start <br /> earning...
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-xs-6">
                <div className="work_process_box">
                  <div className="work_process_box_inner">
                    <img
                      src="images/wrkprcsicn3.png"
                      alt="wrkprcsicn1"
                      className="img-responsive"
                    />
                    <h5>24/7 Support</h5>
                    <p>
                      We are always available through all our channels
                      <br />
                      to answer any questions...
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-xs-6">
                <div className="work_process_box">
                  <div className="work_process_box_inner">
                    <img
                      src="images/wrkprcsicn4.png"
                      alt="wrkprcsicn1"
                      className="img-responsive"
                    />
                    <h5>Fast and Reliable Matching</h5>
                    <p>
                      Our matching is fast and reliable and runs round the
                      clock.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="services" style={{ marginBottom: "60px" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div
                  className="services_left"
                  style={{ "margin-left": "130px" }}
                >
                  <ul style={{ "margin-top": "100px" }}>
                    <li>
                      <h4>
                        Tesla Mining Limited
                        <p>
                          12 Queensway, London <br />
                          United Kingdom
                        </p>
                      </h4>
                    </li>
                    <li>
                      <h4>
                        UK COMPANY REGISTRATION DETAILS:
                        <p>Company Registration Number 12518089</p>
                      </h4>
                    </li>
                  </ul>

                  <a
                    style={{ fontSize: "12px", marginRight: "10px" }}
                    className="btn btn-default"
                    href="images/certificate.jpg"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    View Certificate
                  </a>
                  <a
                    style={{ fontSize: "12px" }}
                    className="btn btn-default"
                    href="https://beta.companieshouse.gov.uk/company/12518089"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>Check Company</span>
                  </a>
                </div>
              </div>
              <div className="col-md-5 col-sm-12">
                <div className="services_right">
                  <div className="office-image"></div>
                </div>
                <div className="services_right">
                  <span>
                    <img
                      src="images/certificate_img.jpg"
                      alt="certificate_img"
                      className="video_img_1 img-responsive"
                    />
                    <img
                      src="images/video_img_2.png"
                      alt="video_img"
                      className="video_img_2 img-responsive"
                    />
                    <a href="#">
                      <i className="fa fa-play"></i>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section> */}

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

export default About;
