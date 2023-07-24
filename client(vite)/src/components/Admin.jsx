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
  const [outstandingghers, setOutstandingGhers] = useState([]);
  const [fourDayghers, setFourDayGhers] = useState([]);
  const [oneDayghers, setOneDayGhers] = useState([]);
  const [sevenDayghers, setSevenDayGhers] = useState([]);
  const [phers, setPhers] = useState([]);
  const [pendingGhers, setPendingGhers] = useState([]);
  const [users, setUsers] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [ghData, setGhData] = useState({ email: "", amount: null });
  const [matchTelegramData, setMatchTelegramData] = useState({
    gher_name: null,
    pher_name: null,
    amount: null,
    new_user: null,
  });

  const getUserData = async () => {
    try {
      console.log("get userData running");
      if (users.length > 0) {
        // setLoading(false);
        return console.log("already gotten user data");
      }
      const usersData = await axios.get("/users/", {
        withCredentials: true,
      });
      console.log("user data", usersData.data);
      if (usersData.data === "blocked") return history.push("/contactSupport");
      setUsers((prevState) => [...prevState, ...usersData.data]);

      const receiptsData = await axios.get(`/receipts`, {
        withCredentials: true,
      });
      console.log("receipts data", receiptsData.data);
      setReceipts((prevState) => [...prevState, ...receiptsData.data]);
      const oneDayghersData = await axios.get(`/ghers/1D`, {
        withCredentials: true,
      });
      console.log("1daygher data", oneDayghersData.data);
      setOneDayGhers((prevState) => [...prevState, ...oneDayghersData.data]);
      const fourDayghersData = await axios.get(`/ghers/4D`, {
        withCredentials: true,
      });
      console.log("4daygher data", fourDayghersData.data);
      setFourDayGhers((prevState) => [...prevState, ...fourDayghersData.data]);
      const sevenDayghersData = await axios.get(`/ghers/7D`, {
        withCredentials: true,
      });
      console.log("7daygher data", sevenDayghersData.data);
      setSevenDayGhers((prevState) => [
        ...prevState,
        ...sevenDayghersData.data,
      ]);
      const phersData = await axios.get(`/phers`, {
        withCredentials: true,
      });
      console.log("pher data", phersData.data);
      setPhers((prevState) => [...prevState, ...phersData.data]);
      const pendingGhersData = await axios.get(`/ghers/pending`, {
        withCredentials: true,
      });
      console.log("pendingGher data", pendingGhersData.data);
      setPendingGhers((prevState) => [...prevState, ...pendingGhersData.data]);
      const outstandingGhersData = await axios.get(`/ghers/outstanding`, {
        withCredentials: true,
      });
      console.log("outGher data", outstandingGhersData.data);
      setOutstandingGhers((prevState) => [
        ...prevState,
        ...outstandingGhersData.data,
      ]);
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
  const OneDayGhHandler = async () => {
    try {
      setloading(true);
      const res = await axios.get(`/receipts/automatch-1DayGher`, {
        withCredentials: true,
      });
      setloading(false);
      setResponse(res.data);
      setSuccess(true);
      console.log("1daygher response", res.data);
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
  const FourDayGhHandler = async () => {
    try {
      setloading(true);
      const res = await axios.get(`/receipts/automatch-4DayGher`, {
        withCredentials: true,
      });
      setloading(false);
      setResponse(res.data);
      setSuccess(true);
      console.log("1daygher response", res.data);
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
  const SevenDayGhHandler = async () => {
    try {
      setloading(true);
      const res = await axios.get(`/receipts/automatch-7DayGher`, {
        withCredentials: true,
      });
      setloading(false);
      setResponse(res.data);
      setSuccess(true);
      console.log("1daygher response", res.data);
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

  const OutstandingGhHandler = async () => {
    try {
      setloading(true);
      const res = await axios.get(`/receipts/automatch-outGher`, {
        withCredentials: true,
      });
      setloading(false);
      setResponse(res.data);
      setSuccess(true);
      console.log("outgher response", res.data);
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
      const res = await axios.post(`/receipts/match-a-user-instant`, ghData);
      setloading(false);
      setResponse(res.data);
      setSuccess(true);
      console.log("matchUser response", res.data);
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
  const pledgeHandler = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await axios.post(`/users/post-pledge`, ghData);
      setloading(false);
      setResponse(res.data);
      setSuccess(true);
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
  const postMatchHandler = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await axios.post(`/users/post-a-match`, matchTelegramData);
      setloading(false);
      setResponse(res.data);
      setSuccess(true);
    } catch (err) {
      setloading(false);
      if (err.response.status === 500) {
        console.log("there was a problem with the server");
        return window.location.reload();
      }
      setResponse(err.response.data);
      setError(true);
    }
  };

  const postConfirmationHandler = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await axios.post(
        `/users/post-a-confirmation`,
        matchTelegramData
      );
      setloading(false);
      setResponse(res.data);
      setSuccess(true);
    } catch (err) {
      setloading(false);
      if (err.response.status === 500) {
        console.log("there was a problem with the server");
        return window.location.reload();
      }
      setResponse(err.response.data);
      setError(true);
    }
  };
  const postNewUserHandler = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await axios.post(`/users/post-new-user`, matchTelegramData);
      setloading(false);
      setResponse(res.data);
      setSuccess(true);
    } catch (err) {
      setloading(false);
      if (err.response.status === 500) {
        console.log("there was a problem with the server");
        return window.location.reload();
      }
      setResponse(err.response.data);
      setError(true);
    }
  };
  const postActivatedUserHandler = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await axios.post(
        `/users/post-activated-user`,
        matchTelegramData
      );
      setloading(false);
      setResponse(res.data);
      setSuccess(true);
    } catch (err) {
      setloading(false);
      setResponse(err.response.data);
      setError(true);
    }
  };
  const inputHandler = (e) => {
    e.preventDefault();
    let key = e.target.name;
    let value = e.target.value;
    setGhData((prev) => ({ ...prev, [key]: value }));
  };
  const inputHandler2 = (e) => {
    e.preventDefault();
    let key = e.target.name;
    let value = e.target.value;
    setMatchTelegramData((prev) => ({ ...prev, [key]: value }));
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
                    <h3>7DayGH</h3>
                    <h6>
                      No :
                      <b id="total_balance">
                        {sevenDayghers.length ? sevenDayghers.length : 0}
                      </b>
                    </h6>
                    <h6>
                      Amount :
                      <b id="total_balance">
                        {sevenDayghers.length
                          ? sevenDayghers
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
                    <h3>oneDayGh</h3>
                    <h6>
                      No :
                      <b id="total_balance">
                        {oneDayghers.length ? oneDayghers.length : 0}
                      </b>
                    </h6>
                    <h6>
                      Amount :
                      <b id="total_balance">
                        {oneDayghers.length
                          ? oneDayghers
                              .map((el) => el.amount)
                              .reduce((a, b) => a + b, 0)
                          : 0}
                      </b>
                    </h6>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-6">
                  <div className="summary_box">
                    <h3>4dayGH</h3>
                    <h6>
                      No :
                      <b id="total_balance">
                        {fourDayghers.length ? fourDayghers.length : 0}
                      </b>
                    </h6>
                    <h6>
                      Amount :
                      <b id="total_balance">
                        {fourDayghers.length
                          ? fourDayghers
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
                    <h3>outstandingGh</h3>
                    <h6>
                      No :
                      <b id="total_balance">
                        {outstandingghers.length ? outstandingghers.length : 0}
                      </b>
                    </h6>
                    <h6>
                      Amount :
                      <b id="total_balance">
                        {outstandingghers.length
                          ? outstandingghers
                              .map((el) => el.amount)
                              .reduce((a, b) => a + b, 0)
                          : 0}
                      </b>
                    </h6>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-6">
                  <div className="summary_box">
                    <h3>Receipts</h3>
                    <h6>
                      No :
                      <b id="total_balance">
                        {receipts.length ? receipts.length : 0}
                      </b>
                    </h6>
                    <h6>
                      Amount :
                      <b id="total_balance">
                        {receipts.length
                          ? receipts
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
            <div className="col-xs-3">
              <div className="hashpower_left">
                <button className="btn btn-white" onClick={OneDayGhHandler}>
                  Merge1dayGh
                </button>
              </div>
            </div>
            <div className="col-xs-3">
              <div className="hashpower_right">
                <button className="btn btn-primary" onClick={FourDayGhHandler}>
                  Merge4DayGh
                </button>
              </div>
            </div>
            <div className="col-xs-3">
              <div className="hashpower_right">
                <button className="btn btn-primary" onClick={SevenDayGhHandler}>
                  Merge7DayGh
                </button>
              </div>
            </div>
            <div className="col-xs-3">
              <div className="hashpower_right">
                <button
                  className="btn btn-primary"
                  onClick={OutstandingGhHandler}
                >
                  MergeOutstandingGh
                </button>
              </div>
            </div>
          </div>
          <br />
          <form name="mainform">
            <div className="col-sm-8 col-xs-12">
              {" "}
              <div className="form_box form_box_login">
                <span>
                  <input
                    placeholder="User Email for GH"
                    type="email"
                    name="email"
                    className="inpts"
                    size="30"
                    required
                    onChange={inputHandler}
                  />

                  <input
                    placeholder="Amount for GH"
                    type="number"
                    name="amount"
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
          <form name="mainform2">
            <div className="col-sm-8 col-xs-12">
              {" "}
              <div className="form_box form_box_login">
                <span>
                  <input
                    placeholder="name for Payer"
                    type="email"
                    name="pher_name"
                    className="inpts"
                    size="30"
                    required
                    onChange={inputHandler2}
                  />
                  <input
                    placeholder="name for receiver"
                    type="email"
                    name="gher_name"
                    className="inpts"
                    size="30"
                    required
                    onChange={inputHandler2}
                  />

                  <input
                    placeholder="Amount"
                    type="number"
                    name="amount"
                    className="inpts"
                    size="30"
                    required
                    onChange={inputHandler2}
                  />
                </span>
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Matched(Telegram)"
                  onClick={postMatchHandler}
                />{" "}
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="ConfirmPayment(Telegram)"
                  onClick={postConfirmationHandler}
                />
              </div>
            </div>
          </form>
          <form name="mainform3">
            <div className="col-sm-8 col-xs-12">
              {" "}
              <div className="form_box form_box_login">
                <span>
                  <input
                    placeholder="Name of new User"
                    type="email"
                    name="new_user"
                    className="inpts"
                    size="30"
                    required
                    onChange={inputHandler2}
                  />
                </span>
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="user have registered(Telegram)"
                  onClick={postNewUserHandler}
                />
              </div>
            </div>
          </form>
          <form name="mainform4">
            <div className="col-sm-8 col-xs-12">
              {" "}
              <div className="form_box form_box_login">
                <span>
                  <input
                    placeholder="Name of Activated User"
                    type="email"
                    name="new_user"
                    className="inpts"
                    size="30"
                    required
                    onChange={inputHandler2}
                  />
                </span>
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="user Activated(Telegram)"
                  onClick={postActivatedUserHandler}
                />
              </div>
            </div>
          </form>
          <form name="mainform">
            <div className="col-sm-8 col-xs-12">
              {" "}
              <div className="form_box form_box_login">
                <span>
                  <input
                    placeholder="Username for pledge"
                    type="text"
                    name="email"
                    className="inpts"
                    size="30"
                    required
                    onChange={inputHandler}
                  />

                  <input
                    placeholder="Amount for pledge"
                    type="number"
                    name="amount"
                    className="inpts"
                    size="30"
                    required
                    onChange={inputHandler}
                  />
                </span>
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="post Pledge(Telegram)"
                  onClick={pledgeHandler}
                />
              </div>
            </div>
          </form>

          <div
            className="container"
            style={{ marginTop: " 20px", marginBottom: "20px" }}
          >
            <div className="row">
              <div className="col-md-10 col-sm-12"></div>
              <br />
              <div className="col-md-10 col-sm-12"></div>
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
