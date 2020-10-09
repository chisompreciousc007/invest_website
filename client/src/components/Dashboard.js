import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Spinner from "./Spinner";
import Error from "./Error";
import Footer from "./Footer";
import Header from "./Header";
import { UserContext } from "./UserContext";
import NavBar from "./NavBar";
import { addHours, format } from "date-fns";
const baseUrl = process.env.baseURL || "http://localhost:4000";

function Dashboard() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(null);
  const isEmpty = (obj) => {
    for (var i in obj) {
      return false;
    }
    return true;
  };
  const {
    name,
    username,
    isActivated,
    createdAt,
    cashoutHistory,
    investHistory,
  } = user.user;
  const { getArr, payArr } = user;

  const getUserData = () => {
    console.log("get userData running");
    if (user.user._id) {
      setLoading(false);
      return console.log("already gotten user data");
    }
    axios
      .get(baseUrl + "/users/user", { withCredentials: true })
      .then((res) => {
        console.log("user data", res.data);
        if (res.data === "blocked") return history.push("/contactSupport");
        setUser((prevState) => ({
          ...prevState,
          user: { ...res.data },
        }));

        axios
          .get(`${baseUrl}/receipts/foruser/${res.data.email}`, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("receipt data", res.data);
            setUser((prevState) => ({
              ...prevState,
              ...res.data,
            }));
          });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.data === "ACCESS DENIED") {
          setResponse(err.response.data);
          return setError(true);
        }
        setResponse("err.message");
        setError(true);
      });
  };
  useEffect(() => {
    getUserData();
  }, []);

  if (isEmpty(user.user)) return <Spinner />;

  return (
    <div>
      {error && (
        <Error
          response={response}
          setError={() => {
            setError(false);
            window.location.reload();
          }}
        />
      )}
      {loading && <Spinner />}
      {!loading && !isEmpty(user.user) && (
        <div>
          <header className="inner_page_header">
            <Header />
            <section className="admin_body">
              <NavBar />

              <div
                className="container"
                style={{ marginTop: " 20px", marginBottom: "20px" }}
              >
                <div className="row">
                  <div className="col-md-5 col-sm-12">
                    <div className="admin_head_left">
                      <h4>
                        Hello, {name},
                        <span>
                          Your referral link:{" "}
                          {`https://splashcash247.com/signup=${username}`}
                        </span>
                      </h4>
                    </div>
                  </div>
                  <div className="col-md-7 col-sm-12"></div>
                </div>

                <div className="currency_hashrate">
                  <div className="container">
                    <h2 className="common_heading">Your account</h2>
                    <div
                      className="row"
                      style={{
                        width: "80%",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <div className="col-sm-6 col-xs-6">
                        <div className="summary_box">
                          <h3>Pending PH</h3>
                          <h6>
                            NGN
                            <b id="total_balance">
                              {payArr !== []
                                ? payArr
                                    .map((el) => el.amount)
                                    .reduce((a, b) => a + b, 0)
                                : 0}
                            </b>
                          </h6>
                        </div>
                      </div>

                      <div className="col-sm-6 col-xs-6">
                        <div className="summary_box">
                          <h3>Pending GH</h3>
                          <h6>
                            NGN
                            <b>
                              {getArr !== []
                                ? getArr
                                    .map((el) => el.amount)
                                    .reduce((a, b) => a + b, 0)
                                : 0}
                            </b>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div
                      className="row"
                      style={{
                        width: "80%",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <div className="col-sm-6 col-xs-6">
                        <div className="summary_box">
                          <h3>Total GH</h3>
                          <h6>
                            NGN
                            <b id="total_balance">
                              {cashoutHistory
                                .map((el) => el.amount)
                                .reduce((a, b) => a + b, 0)}
                            </b>
                          </h6>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xs-6">
                        <div className="summary_box">
                          <h3>Total PH</h3>
                          <h6>
                            NGN
                            <b>
                              {investHistory
                                .map((el) => el.amount)
                                .reduce((a, b) => a + b, 0)}
                            </b>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {isActivated ? (
                <div className="hash_power_content">
                  <div className="container">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="hashpower_left">
                          <h2>Deposit</h2>
                          <Link className="btn btn-white" to="/deposit">
                            Click Here
                          </Link>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="hashpower_right">
                          <h2>Withdraw</h2>
                          <Link className="btn btn-primary" to="/deposit">
                            Click Here
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hash_power_content">
                  <div className="container">
                    <div className="row">
                      <div className="col-xs-12">
                        <div className="hashpower_left">
                          <h2>
                            Pay a fee of NGN1000 to a guider to be activated.
                            You have until{" "}
                            {` ${format(
                              addHours(new Date(createdAt), 8),
                              "MMM-dd' 'hh:mm aaaa"
                            )} `}
                            to make this Payment or your account will be
                            blocked.
                          </h2>
                          <Link className="btn btn-white" to="/deposit">
                            Click Here
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>
            <Footer />
          </header>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
