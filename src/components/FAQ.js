import React from "react";

function Faq() {
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

      <section class="inner_page_heading">
        <div class="container">
          <div class="row">
            <div class="col-sm-6">
              <div class="main_title">
                <h3>faq</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="bottom_body inner_page_body">
        <section class="common_page">
          <div class="container">
            <script>
              {/* $(document).ready(function() {
                                $('.accordion').find('.accordion-toggle').click(function () {
                                    $(this).next().slideToggle('600');
                                    $(".accordion-content").not($(this).next()).slideUp('600')
                                })
	$('.accordion-toggle').on('click', function() {
                                $(this).toggleClass('active').siblings().removeClass('active')
	});
}); */}
            </script>

            <div class="faq_page">
              <div class="accordion">
                <h4
                  style={{
                    "border-bottom": "1px solid white",
                    "border-radius": "0px",
                    width: "500px",
                    color: "#fff",
                    height: "25px",
                    marginTop: "20px",
                    textTransform: "capitalize",
                  }}
                >
                  About Company
                </h4>
                <h4 class="accordion-toggle">What is SplashCash247?</h4>
                <div class="accordion-content">
                  <p>
                    Splashcash247 is a Legal company that handles a P2P
                    investment Platform.
                  </p>
                </div>
                <h4 class="accordion-toggle">Who can be a participant?</h4>
                <div class="accordion-content">
                  <p>
                    Any interested person can invest and start earning, you do
                    not need to worry about anything, just the amount you want
                    to invest. Of course for any doubt our support is always
                    ready to help you.{" "}
                  </p>{" "}
                </div>
                <h4 class="accordion-toggle">
                  Is Splashcash247 platform safe?
                </h4>
                <div class="accordion-content">
                  <p>
                    Yes,we are using the most powerful DDoS protection in the
                    industry with 100% up-time guarantee. Our worldwide web
                    servers are protected by Cloudfare, the world's largest and
                    most trusted DDoS protection and mitigation provider.
                  </p>
                </div>
                <h4 class="accordion-toggle">
                  Is SplashCash247 platform realible?
                </h4>
                <div class="accordion-content">
                  <p>
                    SplashCash247 uses HTTPS encryption and the business is
                    certified.
                  </p>
                </div>
                <h4
                  style={{
                    "border-bottom": "1px solid white",
                    "border-radius": "0px",
                    width: "500px",
                    color: "#fff",
                    height: "25px",
                    "margin-top": "20px",
                    "text-transform": "capitalize",
                  }}
                >
                  Technical
                </h4>
                <h4 class="accordion-toggle">
                  What is the maximum limit of money I can invest?
                </h4>
                <div class="accordion-content">
                  <p>Each user can invest a maximum of NGN500,000.</p>
                </div>

                <h4 class="accordion-toggle">How can I Invest?</h4>
                <div class="accordion-content">
                  <p>
                    In the "Dashboard" section of your account, enter the amount
                    that fit your needs, the plan will be automatically
                    selected. After your plan is selected you can send the
                    amountto who you are matched and your investment will be
                    confirmed.
                  </p>
                </div>

                <h4 class="accordion-toggle">
                  Can I make money without investing anything?
                </h4>
                <div class="accordion-content">
                  <p>
                    Yes, we have developed a referral program. You will receive
                    a 10% bonus on deposits from members you invited to the
                    project.To do this, they must enroll with your referal link.
                    <br />
                    Your referral link will be available in the Personal Area
                    after registration.
                  </p>
                </div>

                <h4 class="accordion-toggle">
                  What is the minimum amount to withdraw?
                </h4>
                <div class="accordion-content">
                  <p>Minimum withdrawal amount NGN7,500</p>
                </div>

                <h4
                  style={{
                    "border-bottom": "1px solid white",
                    "border-radius": "0px",
                    width: "500px",
                    color: "#fff",
                    height: "25px",
                    "margin-top": "20px",
                    "text-transform": "capitalize",
                  }}
                >
                  General
                </h4>

                <h4 class="accordion-toggle">Can I own multiple accounts?</h4>
                <div class="accordion-content">
                  <p>
                    Each account is related to only one owner with a unique
                    email and phone number. In case of multiple accounts, you
                    must not use an email or phone number twice.
                  </p>
                </div>

                <h4 class="accordion-toggle">
                  I can't find the answer to my question
                </h4>
                <div class="accordion-content">
                  <p>
                    Write us with the help of the form of{" "}
                    <a href="/support">"Support"</a>
                  </p>
                </div>
              </div>
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

export default Faq;
