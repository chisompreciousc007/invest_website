import React from "react";
import Footer2 from "./Footer2";
import Header2 from "./Header2";

function Faq() {
  return (
    <div>
      <Header2 />

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
              $(document).ready(function()
              {$(".accordion")
                .find(".accordion-toggle")
                .click(function () {
                  $(this).next().slideToggle("600");
                  $(".accordion-content").not($(this).next()).slideUp("600");
                })
              $('.accordion-toggle').on('click', function(){" "}
              {$(this).toggleClass("active").siblings().removeClass("active")});
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
                <h4 class="accordion-toggle">Lorem ipsum dolor sit?</h4>
                <div class="accordion-content">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                </div>
                <h4 class="accordion-toggle">Lorem ipsum dolor sit?</h4>
                <div class="accordion-content">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>{" "}
                </div>
                <h4 class="accordion-toggle">Lorem ipsum dolor sit?</h4>
                <div class="accordion-content">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                </div>
                <h4 class="accordion-toggle">Lorem ipsum dolor sit?</h4>
                <div class="accordion-content">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
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
                <h4 class="accordion-toggle">Lorem ipsum dolor sit?</h4>
                <div class="accordion-content">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>

                <h4 class="accordion-toggle">Lorem ipsum dolor sit?</h4>
                <div class="accordion-content">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                </div>

                <h4 class="accordion-toggle">Lorem ipsum dolor sit?</h4>
                <div class="accordion-content">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                  </p>
                </div>

                <h4 class="accordion-toggle">Lorem ipsum dolor sit?</h4>
                <div class="accordion-content">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
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

                <h4 class="accordion-toggle">Lorem ipsum dolor sit?</h4>
                <div class="accordion-content">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
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

export default Faq;
