import React from "react";

function Footer2() {
  return (
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
              <h6>© 2020 All Rights Reserved.</h6>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer2;
