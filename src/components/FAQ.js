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
            {/* <script>

                            $(document).ready(function() {
                                $('.accordion').find('.accordion-toggle').click(function () {
                                    $(this).next().slideToggle('600');
                                    $(".accordion-content").not($(this).next()).slideUp('600')
                                });
	$('.accordion-toggle').on('click', function() {
                                $(this).toggleClass('active').siblings().removeClass('active')
	});
});


    </script> */}

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
                <h4 class="accordion-toggle">What is Tesla Mining Limited?</h4>
                <div class="accordion-content">
                  <p>
                    Tesla Mining Limited Limited is a Legal UK company that
                    develops software and hardware for cloud Mining and
                    maintains equipment in datacenters.
                  </p>
                </div>
                <h4 class="accordion-toggle">
                  Is Tesla Mining Limited a registered and legal company?
                </h4>
                <div class="accordion-content">
                  <p>
                    Yes, Tesla Mining Limited Limited is registered in the
                    United Kingdom as "Tesla Mining Limited Limited" with a
                    registration number of 12518089.
                  </p>
                </div>

                <h4 class="accordion-toggle">Who can be our customer?</h4>
                <div class="accordion-content">
                  <p>
                    Any interested person can become the investor of Tesla
                    Mining Limited , no matter how well you understand technical
                    aspects of Bitcoin mining, you do not need to worry about
                    anything, just the amount you want to invest. Of course for
                    any doubt our support is always ready to help you.{" "}
                  </p>{" "}
                </div>
                <h4 class="accordion-toggle">
                  The Tesla Mining Limited platform is safe?
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
                  The Tesla Mining Limited platform is realible?
                </h4>
                <div class="accordion-content">
                  <p>
                    Tesla Mining Limited uses HTTPS encryption and the business
                    is certified by GEOTRUST TRUE BUSINESS ID.
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
                  What is the maximum limit of hash power can I buy?
                </h4>
                <div class="accordion-content">
                  <p>
                    Each user can buy maximum 75010.0 TH/S equivalent to 100 BTC
                    of contract purchased.
                  </p>
                </div>

                <h4 class="accordion-toggle">How can I make a deposit?</h4>
                <div class="accordion-content">
                  <p>
                    In the "Make A Deposit" section of your account, enter the
                    amount that fit your needs, the plan will be automatically
                    selected. After your plan is selected you can send the
                    amount using your BitCoin wallet or in case you have already
                    credit on your account balance and you want to use it to buy
                    more hash power just select the specific option.
                  </p>
                </div>

                <h4 class="accordion-toggle">
                  What payment system can I use for buy hashpower and start to
                  earn?
                </h4>
                <div class="accordion-content">
                  <p>
                    Given the fact that our company is involved in
                    cryptocurrency mining, BitCoin is our only payment method.
                  </p>
                </div>
                <h4 class="accordion-toggle">
                  Can I make money without investing anything?
                </h4>
                <div class="accordion-content">
                  <p>
                    Yes, we have developed a referral program. You will receive
                    a 3% bonus on deposits from members you invited to the
                    project.To do this, they must enroll in your account.
                    <br />
                    Your referral link will be available in the Personal Area
                    after registration.
                  </p>
                </div>

                <h4 class="accordion-toggle">
                  What is the minimum amount to withdraw?
                </h4>
                <div class="accordion-content">
                  <p>Minimum withdrawal amount 0.0003 BTC</p>
                </div>

                <h4 class="accordion-toggle">Where can I buy BitCoin?</h4>
                <div class="accordion-content">
                  <p>
                    You can find cryptocurrency sellers here:
                    https://howtobuybitcoins.info
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
                  General
                </h4>

                <h4 class="accordion-toggle">Can I own multiple accounts?</h4>
                <div class="accordion-content">
                  <p>
                    Each account is related to only one owner who will only can
                    manage one.Allowed 1 account one owner 1 ip address. In case
                    of violation, the account will be blocked. Unlocking the
                    account is paid.
                  </p>
                </div>
                <h4 class="accordion-toggle">What is a BitCoin address?</h4>
                <div class="accordion-content">
                  <p>
                    Bitcoin address is your ID (account, wallet number),
                    starting with 1 or 3 and containing 27-34 alphanumeric Latin
                    characters (other than 0, O, I). The address can also be
                    represented as a QR-code, it is anonymous and does not
                    contain information about the owner. For example,
                    1TopMSEYstRatqTFn5Au4m4GFg7xJaNVN2 or
                    398Tt1WpEZ73CNmQviecrnyiWrnqRhWNLy.
                  </p>
                </div>
                <h4 class="accordion-toggle">
                  What is the BitCoin confirmation?
                </h4>
                <div class="accordion-content">
                  <p>
                    All BitCoin operations are confirmed by a BitCoin network.
                    Every single computer in the BitCoin network confirms your
                    transaction, increasing the total number of confirmations.
                    When the number of confirmations reaches a specific
                    threshold, usually from 3 to 6, the funds appear in the
                    recipient account. Usually, such a process takes from up to
                    90 minutes.
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

export default Faq;
