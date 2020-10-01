import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SelectAmount from "./SelectAmount";
import Ph from "./Ph";
import Spinner from "./Spinner";
import Error from "./Error";
import Footer from "./Footer";
import Header from "./Header";
import { UserContext } from "./UserContext";
import NavBar from "./NavBar";

function Dashboard({}) {
  const history = useHistory();
  const [error, setError] = useState(false);
  const [defaultFileLabel, setdefaultFileLabel] = useState("Choose File");
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(null);
  const [currentReceipt, setCurrentReceipt] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState({});
  const [selectAmount, setSelectAmount] = useState(5000);
  const [errormsg, setErrormsg] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const {
    _id,
    name,
    isActivated,
    wantToCashout,
    wantToInvest,
    InvestAmt,
    updatedAt,
    pendingInvestAmt,
    pendingCashoutAmt,
    isBlocked,
  } = user;
  // const addHour = (date, value) => {
  //   console.log("date input in dashboard", date);
  //   if (date !== undefined) {
  //     const dt = date;
  //     dt.setHours(dt.getHours() + value);
  //     return setTime(dt);
  //   }
  //   return console.log("date not loaded");
  // };
  // const getUser = () => {
  //   axios
  //     .get("http://localhost:4000/users/user", { withCredentials: true })
  //     .then((res) => {
  //       console.log(res.data);
  //       setUserData((prevState) => ({
  //         ...prevState,
  //         ...res.data,
  //       }));
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log("error from deposit: ", err.response);
  //       return history.push("/");
  //     });
  //   //
  // };
  // useEffect(() => {
  //   getUser();
  // }, []);
  const fileSelecthandler = (e) => {
    const filename = e.target.files[0].name;
    const file = e.target.files[0];
    setdefaultFileLabel(filename);
    setFile(file);
    console.log(file);
  };
  const fileUploadHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    console.log("formdata: ", formData);
    try {
      const res = await axios.post("http://localhost:4000/uploads", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      // axios
      //   .patch(`http://localhost:4000/receipts/popPath/${currentReceipt._id}`, {
      //     popPath: filePath,
      //   })
      //   .then((res) => {
      //     console.log("edit popPath successful!!", res.data);
      //   });
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) {
        console.log("there was a problem with the server");
      } else {
        console.log(error.response.data.msg);
      }
    }
  };
  const submitAmountHandler = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:4000/users/wantToInvest/${_id}`, {
        InvestAmt: +selectAmount,
      })
      .then((res) => {
        console.log("edit wantToInvest successful!!", res.data);
        history.push("/temp");
        history.goBack();
      })
      .catch((err) => {
        console.log("error from edit wwantToInvest: ", err.response);
        setErrormsg(true);
      });
  };
  const selectAmountHandler = (e) => {
    e.preventDefault();
    const v = e.target.value;
    const val = +v;
    setSelectAmount(val);
    console.log(val);
  };

  return loading ? (
    <Spinner />
  ) : !isBlocked ? (
    <div>
      <header className="inner_page_header">
        <Header />
        {/* <div className="header_top">
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
                      <a className="btn btn-default" href="/">
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
        </div> */}

        <section className="admin_body">
          <NavBar />

          {!isActivated ? (
            <Ph
              title="Please pay an activation fee to be activated"
              fileUpload={fileUploadHandler}
              fileSelect={fileSelecthandler}
              accountName={"gfjghfjh"}
              accountNumber={"mainguider.accountNumber"}
              bank={"mainguider.bank"}
              phone={"mainguider.phone"}
              amount={1000}
              duetime={time}
            />
          ) : !wantToInvest ? (
            <SelectAmount
              submitAmount={submitAmountHandler}
              SelectAmount={selectAmountHandler}
            />
          ) : (
            //ITERATE ALL THAT WILL BE PAID HERE
            <Ph
              title="Please pay an activation fee to be activated"
              fileUpload={fileUploadHandler}
              fileSelect={fileSelecthandler}
              accountName={"gfjghfjh"}
              accountNumber={"mainguider.accountNumber"}
              bank={"mainguider.bank"}
              phone={"mainguider.phone"}
              amount={1000}
              duetime={time}
            />
          )}
        </section>
        <Footer />

        {/* <section className="secure">
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
        </footer> */}
      </header>
    </div>
  ) : (
    <Error
      response="Your Account have been Blocked, Please write to support for verification and reactivation"
      setError={() => {
        history.push("/");
      }}
    />
  );
}

export default Dashboard;
