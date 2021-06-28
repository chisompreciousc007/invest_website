import React from "react";

function Header2() {
  return (
    <header className="inner_page_header">
      <div className="header_top">
        <div className="container">
          <div className="row">
            <div className=" col-sm-3 col-xs-5">
              <div className="logo">
                <a href="/">LOGO HERE</a>
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
  );
}

export default Header2;
