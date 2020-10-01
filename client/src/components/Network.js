import React, { useState, useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { UserContext } from "./UserContext";
import NavBar from "./NavBar";
import { useHistory } from "react-router-dom";

function Referals({}) {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <header className="inner_page_header">
        <Header />
        {/* <div className="header_top">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-6 col-xs-6">
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
              <div className="col-md-5 col-sm-8 col-xs-8">
                <div className="header_top_middle">
                  <a
                    href="https://t.me/teslamininglimited"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="images/tel.png"
                      alt="telegram icon"
                      className="face"
                    />
                    &nbsp; Telegram{" "}
                  </a>
                </div>
              </div>
              <div className="col-md-3 col-sm-4 col-xs-8">
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
        </div> */}

        <section className="admin_body">
          <NavBar />

          <div
            className="container"
            style={{ marginTop: " 20px", marginBottom: "20px" }}
          >
            <div className="row">
              <div className="col-md-10 col-sm-12">
                <table
                  cellspacing="1"
                  cellpadding="2"
                  border="0"
                  width="100%"
                  class="tab"
                >
                  <tbody>
                    <tr>
                      <td class="inheader">
                        <b>User</b>
                      </td>
                      <td class="inheader" width="200">
                        <b>Referal Bonus</b>
                      </td>
                    </tr>
                    <tr>
                      <td class="inheader">
                        <b>olawale mohammmed</b>
                      </td>
                      <td class="inheader" width="200">
                        <b>5000</b>
                      </td>
                    </tr>
                    {/*                    
                    <tr>
                      <td colspan="2">Total Recieved:</td>
                      <td align="right">
                        <b>123456</b>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
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
        <Footer />

        {/* <footer>
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
                  <h6>© 2020 Tesla Mining Limited.ltd. All Rights Reserved.</h6>
                </div>
              </div>
            </div>
          </div>
        </footer> */}
      </header>
    </div>
  );
}

export default Referals;
