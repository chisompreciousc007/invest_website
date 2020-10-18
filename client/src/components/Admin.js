import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Error from "./Error";
import Header from "./Header";
import Footer from "./Footer";
import Spinner from "./Spinner";
import Success from "./Successful";

function Transactions() {
  const history = useHistory();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reading, setReading] = useState(true);
  const [loading, setloading] = useState(false);
  const [response, setResponse] = useState(null);
  const [ghers, setGhers] = useState([]);
  const [phers, setPhers] = useState([]);
  const [pendingGhers, setPendingGhers] = useState([]);
  const [users, setUsers] = useState([]);
  const [ghEmail, setghEmail] = useState({ email: "" });

  const getUserData = async () => {
    try {
      console.log("get userData running");
      if (users.length > 0) {
        // setLoading(false);
        return console.log("already gotten user data");
      }
      const usersData = await axios.get("/users/admin", {
        withCredentials: true,
      });
      console.log("user data", usersData.data);
      if (usersData.data === "blocked") return history.push("/contactSupport");
      setUsers((prevState) => [...prevState, ...usersData.data]);
      const ghersData = await axios.get(`/ghers/admin`, {
        withCredentials: true,
      });
      console.log("gher data", ghersData.data);
      setGhers((prevState) => [...prevState, ...ghersData.data]);
      const phersData = await axios.get(`/phers/admin`, {
        withCredentials: true,
      });
      console.log("pher data", phersData.data);
      setPhers((prevState) => [...prevState, ...phersData.data]);
      const pendingGhersData = await axios.get(`/ghers/pending`, {
        withCredentials: true,
      });
      console.log("pendingGher data", pendingGhersData.data);
      setPendingGhers((prevState) => [...prevState, ...pendingGhersData.data]);
      setReading(false);
    } catch (err) {
      if (err.response.status === 500) {
        console.log("there was a problem with the server");
        return window.location.reload();
      }
      console.log(err.response);
      history.push("/login");
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  const firstcommitHandler = async () => {
    try {
      setloading(true);
      const firstcommit = await axios.get(`/receipts/automatch-firstcommit`, {
        withCredentials: true,
      });
      setloading(false);
      setResponse(firstcommit.data);
      setSuccess(true);
      console.log("firstcommit response", firstcommit.data);
    } catch (err) {
      setloading(false);
      if (err.response.status === 500) {
        console.log("there was a problem with the server");
        return window.location.reload();
      }
      console.log(err.response);
      setResponse(err.response.data);
      setError(true);
    }
  };
  const NonFirstcommitHandler = async () => {
    try {
      setloading(true);
      const NonFirstCommit = await axios.get(
        `/receipts/automatch-otherCommits`
      );
      setloading(false);
      setResponse(NonFirstCommit.data);
      setSuccess(true);
      console.log("Nonfirstcommit response", NonFirstCommit.data);
    } catch (err) {
      setloading(false);
      if (err.response.status === 500) {
        console.log("there was a problem with the server");
        return window.location.reload();
      }
      console.log(err.response);
      setResponse(err.response.data);
      setError(true);
    }
  };
  const matchUserHandler = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const matchUser = await axios.patch(
        `/receipts/match-a-user-instant`,
        ghEmail
      );
      setloading(false);
      setResponse(matchUser.data);
      setSuccess(true);
      console.log("matchUser response", matchUser.data);
    } catch (err) {
      setloading(false);
      if (err.response.status === 500) {
        console.log("there was a problem with the server");
        return window.location.reload();
      }
      console.log(err);
      setResponse(err.response.data);
      setError(true);
    }
  };
  const inputHandler = (e) => {
    e.preventDefault();
    let key = e.target.name;
    let value = e.target.value;
    setghEmail((prev) => ({ ...prev, [key]: value }));
  };
  if (reading) return <Spinner />;
  return (
    <div>
      {error && (
        <Error
          response={response}
          setError={() => {
            setError(false);
            history.push("/login");
          }}
        />
      )}
      {success && (
        <Success
          response={response}
          setSuccess={() => {
            setSuccess(false);
            window.location.reload();
          }}
        />
      )}
      {loading && <Spinner />}
      <header className="inner_page_header">
        <Header />
        {/* <NavBar /> */}
        <section className="admin_body">
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
                    <h3>USER</h3>
                    <h6>
                      {" "}
                      Activated :
                      <b id="total_balance">
                        {users.length
                          ? users.filter(
                              (el) =>
                                el.isActivated === true &&
                                el.isBlocked === false
                            ).length
                          : 0}
                      </b>
                    </h6>
                    <h6>
                      {" "}
                      Blocked :
                      <b id="total_balance">
                        {users.length
                          ? users.filter((el) => el.isBlocked === true).length
                          : 0}
                      </b>
                    </h6>
                    <h6>
                      {" "}
                      Unactivated :
                      <b id="total_balance">
                        {users.length
                          ? users.filter(
                              (el) =>
                                el.isActivated === false &&
                                el.isBlocked === false
                            ).length
                          : 0}
                      </b>
                    </h6>
                  </div>
                </div>

                <div className="col-sm-6 col-xs-6">
                  <div className="summary_box">
                    <h3>GH</h3>
                    <h6>
                      No :
                      <b id="total_balance">
                        {ghers.length ? ghers.length : 0}
                      </b>
                    </h6>
                    <h6>
                      Amount :
                      <b id="total_balance">
                        {ghers.length
                          ? ghers
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
                    <h3>PH</h3>
                    <h6>
                      No :
                      <b id="total_balance">
                        {phers.length ? phers.length : 0}
                      </b>
                    </h6>
                    <h6>
                      Amount :
                      <b id="total_balance">
                        {phers.length
                          ? phers
                              .map((el) => el.amount)
                              .reduce((a, b) => a + b, 0)
                          : 0}
                      </b>
                    </h6>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-6">
                  <div className="summary_box">
                    <h3>PendingGH</h3>
                    <h6>
                      No :
                      <b id="total_balance">
                        {pendingGhers.length ? pendingGhers.length : 0}
                      </b>
                    </h6>
                    <h6>
                      Amount :
                      <b id="total_balance">
                        {pendingGhers.length
                          ? pendingGhers
                              .map((el) => el.amount)
                              .reduce((a, b) => a + b, 0)
                          : 0}
                      </b>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-4">
              <div className="hashpower_left">
                <button className="btn btn-white" onClick={firstcommitHandler}>
                  MergefirstTime
                </button>
              </div>
            </div>
            <div className="col-xs-1"></div>
            <div className="col-xs-4">
              <div className="hashpower_right">
                <button
                  className="btn btn-primary"
                  onClick={NonFirstcommitHandler}
                >
                  MergeOtherTime
                </button>
              </div>
            </div>
          </div>
          <br />
          <form name="mainform">
            {/* <div className="col-sm-6 col-xs-12">
              <div className="form_box form_box_login">
                <span>
                  <input
                    placeholder="Payer"
                    value=""
                    type="text"
                    name="username"
                    className="inpts"
                    size="30"
                  />
                </span>
              </div>
            </div> */}

            <div className="col-sm-8 col-xs-12">
              {" "}
              <div className="form_box form_box_login">
                <span>
                  <input
                    placeholder="User Email for GH"
                    type="text"
                    name="email"
                    className="inpts"
                    size="30"
                    required
                    onChange={inputHandler}
                  />
                </span>
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Match User"
                  onClick={matchUserHandler}
                />
              </div>
            </div>
          </form>

          <div
            className="container"
            style={{ marginTop: " 20px", marginBottom: "20px" }}
          >
            <div className="row">
              <div className="col-md-10 col-sm-12">
                {/* <table
                  cellSpacing="1"
                  cellPadding="2"
                  border="0"
                  width="100%"
                  className="tab"
                >
                  <tbody>
                    <tr>
                      <td className="inheader">
                        <b>PH</b>
                      </td>
                      <td className="inheader" width="200">
                        <b>Name</b>
                      </td>
                      <td className="inheader" width="170">
                        <b>Amount</b>
                      </td>
                    </tr>
                    {investHistory.map((el, index) => (
                      <tr key={index}>
                        <td className="inheader">
                          <b>{index + 1}</b>
                        </td>
                        <td className="inheader" width="200">
                          <b>{el.name}</b>
                        </td>
                        <td className="inheader" width="170">
                          <b>{el.amount}</b>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table> */}
              </div>
              <br />
              <div className="col-md-10 col-sm-12">
                {/* <table
                  cellSpacing="1"
                  cellPadding="2"
                  border="0"
                  width="100%"
                  className="tab"
                >
                  <tbody>
                    <tr>
                      <td className="inheader">
                        <b>GH</b>
                      </td>
                      <td className="inheader" width="200">
                        <b>Name</b>
                      </td>
                      <td className="inheader" width="170">
                        <b>Amount</b>
                      </td>
                    </tr>
                    {cashoutHistory.map((el, index) => (
                      <tr key={index}>
                        <td className="inheader">
                          <b>{index + 1}</b>
                        </td>
                        <td className="inheader" width="200">
                          <b>{el.name}</b>
                        </td>
                        <td className="inheader" width="170">
                          <b>{el.amount}</b>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table> */}
              </div>
            </div>
            <br />
            <br />
          </div>
        </section>
        <Footer />{" "}
      </header>
    </div>
  );
}

export default Transactions;
