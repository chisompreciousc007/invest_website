import React from "react";
import Header2 from "./Header2";
import Footer2 from "./Footer2";
function Home() {
  return (
    <div>
      <header>
        <div className="header_top">
          <div className="container">
            <div className="row">
              <div className=" col-sm-3 col-xs-5">
                <div className="logo">
                  <a href="/">LOGO HERE</a>
                </div>
              </div>
              <div className=" col-sm-6 col-xs-1">
                <div className="header_top_middle"></div>
              </div>
              <div className=" col-sm-3 col-xs-6">
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
        </div>
      </header>
      <section id="header-image2" className="index_banner">
        <div className="index_banner_inner">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="index_banner_content">
                  <h2>
                    Lorem ipsum dolor sit
                    <span>
                      <p style={{ color: "#FFD700" }}>
                        {" "}
                        <span>Lorem ipsum dolor sit</span>
                      </p>
                    </span>
                  </h2>
                  <p>
                    {" "}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                  </p>
                  <span>
                    <br />

                    <a className="btn btn-primary" href="/signup=new">
                      Start Now !
                    </a>
                    <a className="btn btn-primary" href="#index_about_div">
                      More info
                    </a>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="index_about" id="index_about_div">
        <div className="container">
          <div
            className="index_about_inner"
            style={{ background: "#0e010100" }}
          >
            <div className="row">
              <div className="col-sm-12">
                <h2 className="common_heading">How it works</h2>
              </div>
              <div className="col-sm-6">
                <div className="about_left">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sapiente, repudiandae quibusdam cupiditate eveniet
                    laboriosam ad voluptate recusandae modi harum suscipit iusto
                    ipsum, voluptas necessitatibus. Vel vero corrupti
                    necessitatibus perspiciatis eius.
                  </p>
                </div>
              </div>
              <div className="col-sm-6">
                <div
                  className="about_right"
                  style={{ background: "transparent,box-shadow: none" }}
                >
                  <ul>
                    <li>
                      <h4>
                        INVESTMENT PLAN <br />
                        <p>Earn 50% ROI every 48 hours.</p>
                      </h4>
                      <br />
                      <h4 style={{ marginLeft: "106px" }}>
                        {" "}
                        Minimum: 5,000 <br />
                        <br />
                        Maximum : 500,000 <br /> <br /> Principle: INCLUDED
                      </h4>
                    </li>
                  </ul>
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer2 />
      {/* <footer>
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
      </footer>*/}
    </div>
  );
}

export default Home;
