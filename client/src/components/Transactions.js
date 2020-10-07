import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Error from "./Error";
import Header from "./Header";
import Footer from "./Footer";
import { UserContext } from "./UserContext";
import NavBar from "./NavBar";
import Spinner from "./Spinner";

function Transactions() {
  const { user, setUser } = useContext(UserContext);
  const { downline, investHistory, cashoutHistory } = user.user;
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserData = () => {
    console.log("get userData running");
    if (user.user._id) {
      setLoading(false);
      return console.log("already gotten user data");
    }
    axios
      .get("http://localhost:4000/users/user", { withCredentials: true })
      .then((res) => {
        console.log("user data", res.data);
        setUser((prevState) => ({
          ...prevState,
          user: { ...res.data },
        }));

        axios
          .get(`http://localhost:4000/receipts/foruser/${res.data.email}`, {
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
        console.log(err);
        const errmsg = err.response.data;
        setResponse(errmsg);
        setError(true);
      });
  };
  useEffect(() => {
    getUserData();
  }, [user]);
  const isEmpty = (obj) => {
    for (var i in obj) {
      return false;
    }
    return true;
  };
  if (isEmpty(user.user)) return <Spinner />;
  return (
    <div>
      {redirect && <Redirect to="/login" />}
      {error && (
        <Error
          response={response}
          setError={() => {
            setError(false);
            setRedirect(true);
          }}
        />
      )}

      <header className="inner_page_header">
        <Header />
        <section className="admin_body">
          <NavBar />

          <div
            className="container"
            style={{ marginTop: " 20px", marginBottom: "20px" }}
          >
            <div className="row">
              <div className="col-md-10 col-sm-12">
                <table
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
                        <b>Amount</b>
                      </td>
                      <td className="inheader" width="170">
                        <b>Date</b>
                      </td>
                    </tr>
                    {investHistory.map((el) => (
                      <tr>
                        <td className="inheader">
                          <b>{el.gher_accountName}</b>
                        </td>
                        <td className="inheader" width="200">
                          <b>{el.amount}</b>
                        </td>
                        <td className="inheader" width="170">
                          <b>{el.updatedAt}</b>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <br />
              <div className="col-md-10 col-sm-12">
                <table
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
                        <b>Amount</b>
                      </td>
                      <td className="inheader" width="170">
                        <b>Date</b>
                      </td>
                    </tr>
                    {cashoutHistory.map((el) => (
                      <tr>
                        <td className="inheader">
                          <b>{el.pher_name}</b>
                        </td>
                        <td className="inheader" width="200">
                          <b>{el.amount}</b>
                        </td>
                        <td className="inheader" width="170">
                          <b>{el.updatedAt}</b>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <br />
            <br />
            <div className="row">
              <div className="col-md-10 col-sm-12">
                <table
                  cellSpacing="1"
                  cellPadding="2"
                  border="0"
                  width="100%"
                  className="tab"
                >
                  <tbody>
                    <tr>
                      <td className="inheader">
                        <b>Referals</b>
                      </td>
                      <td className="inheader" width="200">
                        <b>Bonus</b>
                      </td>
                    </tr>
                    {downline.map((el) => (
                      <tr>
                        <td className="inheader">
                          <b>{el.name}</b>
                        </td>
                        <td className="inheader" width="200">
                          <b>{el.amount * 0.1}</b>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        <Footer />{" "}
      </header>
    </div>
  );
}

export default Transactions;
