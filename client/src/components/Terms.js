import React from "react";
import Footer2 from "./Footer2";
import Header2 from "./Header2";
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
                Please read the following rules carefully before signing up.
              </h3>

              <p>
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem
                ipsum dolor sit amet consectetur adipisicing elit
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente, repudiandae quibusdam cupiditate eveniet laboriosam ad
                voluptate recusandae modi harum suscipit iusto ipsum, voluptas
                necessitatibus. Vel vero corrupti necessitatibus perspiciatis
                eius.
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente, repudiandae quibusdam cupiditate eveniet laboriosam ad
                voluptate recusandae modi harum suscipit iusto ipsum, voluptas
                necessitatibus. Vel vero corrupti necessitatibus perspiciatis
                eius.
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente, repudiandae quibusdam cupiditate eveniet laboriosam ad
                voluptate recusandae modi harum suscipit iusto ipsum, voluptas
                necessitatibus. Vel vero corrupti necessitatibus perspiciatis
                eius.
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente, repudiandae quibusdam cupiditate eveniet laboriosam ad
                voluptate recusandae modi harum suscipit iusto ipsum, voluptas
                necessitatibus. Vel vero corrupti necessitatibus perspiciatis
                eius.
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente, repudiandae quibusdam cupiditate eveniet laboriosam ad
                voluptate recusandae modi harum suscipit iusto ipsum, voluptas
                necessitatibus. Vel vero corrupti necessitatibus perspiciatis
                eius.
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente, repudiandae quibusdam cupiditate eveniet laboriosam ad
                voluptate recusandae modi harum suscipit iusto ipsum, voluptas
                necessitatibus. Vel vero corrupti necessitatibus perspiciatis
                eius.
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elitLorem
                ipsum dolor sit amet consectetur adipisicing elit
              </p>

              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>

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

      <Footer2 />
    </div>
  );
}

export default Terms;
