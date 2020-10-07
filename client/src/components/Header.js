import React from "react";
import { useHistory } from "react-router-dom";

export default function MainHeader() {
  const history = useHistory();
  const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    history.push("/login");
  };
  return (
    <>
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
                    <a
                      className="btn btn-default"
                      href="/login"
                      onClick={logout}
                    >
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
    </>
  );
}
