import React from "react";

function Terms() {
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
                <h3>Terms and Agreement</h3>
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

            <div class="rules">
              <h3>
                Please read the following rules carefully before signing in.
              </h3>

              <p>
                {" "}
                You agree to be of legal age in your country to partake in this
                program, and in all the cases your minimal age must be 18 years
              </p>

              <p>
                The use of this site is restricted to our members and to
                individuals personally invited by them. Every deposit is
                considered to be a private transaction between splashcash247 and
                its Member
              </p>

              <p>
                You agree that all information and communications coming from
                splashcash are unsolicited and must be kept confidential and
                protected from any disclosure. Moreover, the information,
                communications and materials contained herein are not to be
                regarded as an offer, nor a solicitation for investments in any
                jurisdiction which deems non-public offers or solicitations
                unlawful, nor to any person to whom it will be unlawful to make
                such offer or solicitation.
              </p>

              <p>
                All the data giving by a participant will be only privately used
                and not disclosed to any third parties. splashcash247 is not
                responsible or liable for any loss of data.
              </p>

              <p>
                You agree to hold all principals and members harmless of any
                liability. You are investing at your own risk and you agree that
                a past performance is not an explicit guarantee for the same
                future performance. You agree that all information,
                communications and materials you will find on this site are
                intended to be regarded as an informational and educational
                matter and not an investment advice.
              </p>

              <p>
                We reserve the right to change the rules, commissions and rates
                of the program at any time and at our sole discretion without
                notice, especially in order to respect the integrity and
                security of the members' interests. You agree that it is your
                sole responsibility to review the current terms.
              </p>

              <p>
                splashcash247 is not responsible or liable for any damages,
                losses and costs resulting from any violation of the conditions
                and terms and/or use of our website by a member. You guarantee
                to splashcash247 that you will not use this site in any illegal
                way and you agree to respect your local, national and
                international laws.
              </p>

              <p>
                Don't post bad vote on Public Forums without contacting the
                administrator of our program FIRST. Maybe there was a technical
                problem with your transaction, so please always CLEAR the thing
                with the administrator
              </p>

              <p>
                We will not tolerate SPAM or any type of UCE in this program.
                SPAM violators will be immediately and permanently removed from
                the program
              </p>

              <p>
                splashcash247 reserves the right to accept or decline any member
                for membership without explanation
              </p>

              <p>
                If you do not agree with the above disclaimer, please do not go
                any further.
              </p>
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

export default Terms;
