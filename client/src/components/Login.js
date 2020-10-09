import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Spinner from "./Spinner";
import axios from "axios";
import Error from "./Error";

function Login() {
  const history = useHistory();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowpassword] = useState(false);
  const [response, setResponse] = useState(null);
  // const { user, setUser } = useContext(UserContext);

  const onChangeCheckbox = (e) => {
    e.preventDefault();
    setIsChecked(e.target.checked);
  };
  const onChangeShowPassword = (e) => {
    e.preventDefault();
    setShowpassword(e.target.checked);
  };
  const inputHandler = (e) => {
    e.preventDefault();
    let key = e.target.name;
    let value = e.target.value;
    setLoginData((prev) => ({ ...prev, [key]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    if (isChecked && loginData.username !== "") {
      localStorage.username = loginData.username;
      localStorage.password = loginData.password;
      localStorage.checkbox = isChecked;
    }
    axios
      .post("/users/login", loginData, {
        withCredentials: true,
      })
      .then((res) => {
        document.cookie = `token=${res.data}`;
        console.log("token from server", res);
        history.push("/dashboard");
      })
      .catch((err) => {
        setLoading(false);
        console.log("error", err);
        const errmsg = err.response.data;
        setResponse(errmsg);
        setError(true);
      });
  };
  useEffect(() => {
    console.log(process.env.SECRET);
    if (localStorage.checkbox && localStorage.username !== "") {
      setIsChecked(true);
      setLoginData({
        username: localStorage.username,
        password: localStorage.password,
      });
    }
  }, []);

  return (
    <div>
      {loading && <Spinner />}
      {error && (
        <Error
          response={response}
          setError={() => {
            setError(false);
            window.location.reload();
          }}
        />
      )}
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
      <section className="inner_page_heading">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="main_title">
                <h3>Login</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bottom_body inner_page_body">
        <section className="common_page">
          <div className="container">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <form onSubmit={submitHandler} name="mainform">
                    <h2 className="common_heading">Login</h2>

                    <div className="col-sm-12 col-xs-12">
                      <div className="form_box form_box_login">
                        <p
                          style={{
                            color: "white",
                            display: !error ? "none" : "block",
                          }}
                        >
                          Invalid Username or Password
                        </p>
                        <span>
                          <i className="fa fa-user"></i>
                          <input
                            placeholder="Username"
                            value={loginData ? loginData.username : null}
                            type="text"
                            name="username"
                            className="inpts"
                            size="30"
                            required
                            onChange={inputHandler}
                          />
                        </span>
                      </div>
                    </div>

                    <div className="col-sm-12 col-xs-12">
                      {" "}
                      <div className="form_box form_box_login">
                        <span>
                          <i className="fa fa-key"> </i>
                          <input
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            value={loginData ? loginData.password : null}
                            onChange={inputHandler}
                            name="password"
                            className="inpts"
                            size="30"
                            required
                          />
                        </span>
                        <p style={{ color: "white" }}>
                          {" "}
                          <input
                            type="checkbox"
                            checked={showPassword}
                            name="showpassword"
                            onChange={onChangeShowPassword}
                          />{" "}
                          show Password
                        </p>
                        <p style={{ color: "white" }}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            name="lsRememberMe"
                            onChange={onChangeCheckbox}
                          />{" "}
                          Remember me
                        </p>
                      </div>
                    </div>

                    <div className="col-sm-12 col-xs-12">
                      <div className="form_box">
                        <b>
                          <input
                            className="btn btn-primary"
                            type="submit"
                            value="Login"
                          />
                        </b>
                      </div>
                    </div>
                  </form>

                  <div className="col-sm-12 col-xs-12 text-center">
                    <div className="fp">
                      <a href="/support">remember your login information</a>
                    </div>
                  </div>
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

export default Login;
