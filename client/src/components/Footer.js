import React from "react";

function Footer() {
  return (
    <>
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
                <h6>© 2020 Splashcash247. All Rights Reserved.</h6>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
