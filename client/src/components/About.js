import React from "react";
import Footer2 from "./Footer2";
import Header2 from "./Header2";

function About() {
  return (
    <div>
      <Header2 />

      <section className="inner_page_heading">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="main_title">
                <h3>About Us</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bottom_body inner_page_body">
        <section className="index_about">
          <div className="container">
            <div
              className="index_about_inner"
              style={{ background: "#0e010100" }}
            >
              <div className="row">
                <div className="col-sm-12">
                  <h2 className="common_heading">Welcome to OUR WEBSITE</h2>
                </div>
                <div className="col-sm-7">
                  <div className="about_left">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sapiente, repudiandae quibusdam cupiditate eveniet
                      laboriosam ad voluptate recusandae modi harum suscipit
                      iusto ipsum, voluptas necessitatibus. Vel vero corrupti
                      necessitatibus perspiciatis eius. Lorem ipsum dolor sit
                      amet consectetur adipisicing elit. Sapiente, repudiandae
                      quibusdam cupiditate eveniet laboriosam ad voluptate
                      recusandae modi harum suscipit iusto ipsum, voluptas
                      necessitatibus. Vel vero corrupti necessitatibus
                      perspiciatis eius.
                    </p>
                  </div>
                </div>
                <div className="col-sm-5">
                  <div
                    className="about_right"
                    style={{ marginTop: "55px" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="work_process">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-6 col-xs-6">
                <div className="work_process_box">
                  <div className="work_process_box_inner">
                    <img
                      src="images/wrkprcsicn1.png"
                      alt="wrkprcsicn1"
                      className="img-responsive"
                    />
                    <h5>Lorem ipsum dolor sit</h5>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit
                      <br />
                      ipsum
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-xs-6">
                <div className="work_process_box">
                  <div className="work_process_box_inner">
                    <img
                      src="images/wrkprcsicn2.png"
                      alt="wrkprcsicn1"
                      className="img-responsive"
                    />
                    <h5>Lorem ipsum dolor sit</h5>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit
                      <br />
                      Lorem ipsum dolor elit
                      <br /> lorem
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-xs-6">
                <div className="work_process_box">
                  <div className="work_process_box_inner">
                    <img
                      src="images/wrkprcsicn3.png"
                      alt="wrkprcsicn1"
                      className="img-responsive"
                    />
                    <h5>Lorem ipsum dolor sit</h5>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit
                      <br />
                      Lorem ipsum dolor sit
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-xs-6">
                <div className="work_process_box">
                  <div className="work_process_box_inner">
                    <img
                      src="images/wrkprcsicn4.png"
                      alt="wrkprcsicn1"
                      className="img-responsive"
                    />
                    <h5>Lorem ipsum dolor sit</h5>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="services" style={{ marginBottom: "60px" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div
                  className="services_left"
                  style={{ "margin-left": "130px" }}
                >
                  <ul style={{ "margin-top": "100px" }}>
                    <li>
                      <h4>
                        Tesla Mining Limited
                        <p>
                          12 Queensway, London <br />
                          United Kingdom
                        </p>
                      </h4>
                    </li>
                    <li>
                      <h4>
                        UK COMPANY REGISTRATION DETAILS:
                        <p>Company Registration Number 12518089</p>
                      </h4>
                    </li>
                  </ul>

                  <a
                    style={{ fontSize: "12px", marginRight: "10px" }}
                    className="btn btn-default"
                    href="images/certificate.jpg"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    View Certificate
                  </a>
                  <a
                    style={{ fontSize: "12px" }}
                    className="btn btn-default"
                    href="https://beta.companieshouse.gov.uk/company/12518089"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>Check Company</span>
                  </a>
                </div>
              </div>
              <div className="col-md-5 col-sm-12">
                <div className="services_right">
                  <div className="office-image"></div>
                </div>
                <div className="services_right">
                  <span>
                    <img
                      src="images/certificate_img.jpg"
                      alt="certificate_img"
                      className="video_img_1 img-responsive"
                    />
                    <img
                      src="images/video_img_2.png"
                      alt="video_img"
                      className="video_img_2 img-responsive"
                    />
                    <a href="#">
                      <i className="fa fa-play"></i>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section> */}

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
    </div>
  );
}

export default About;
