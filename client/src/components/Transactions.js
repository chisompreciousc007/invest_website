import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Error from "./Error";
import Header from "./Header";
import Footer from "./Footer";
import { UserContext } from "./UserContext";
import NavBar from "./NavBar";
import Spinner from "./Spinner";

function Transactions() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const { downline, investHistory, cashoutHistory, guiderHistory } = user.user;
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(null);

  const getUserData = () => {
    console.log("get userData running");
    if (user.user._id) {
      return console.log("already gotten user data");
    }
    axios
      .get("/users/user", { withCredentials: true })
      .then((res) => {
        console.log("user data", res.data);
        if (res.data === "blocked") return history.push("/contactSupport");
        setUser((prevState) => ({
          ...prevState,
          user: { ...res.data },
        }));

        axios
          .get(`/receipts/foruser/${res.data.email}`, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("receipt data", res.data);
            setUser((prevState) => ({
              ...prevState,
              ...res.data,
            }));
          });
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
  const isEmpty = (obj) => {
    for (var i in obj) {
      return false;
    }
    return true;
  };
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
                        <b>Name</b>
                      </td>
                      <td className="inheader" width="170">
                        <b>Amount</b>
                      </td>
                    </tr>
                    {investHistory.map((el, index) => (
                      <tr key={index}>
                        <td className="inheader">
                          <b>{index+1}</b>
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
                        <b>Name</b>
                      </td>
                      <td className="inheader" width="170">
                        <b>Amount</b>
                      </td>
                    </tr>
                    {cashoutHistory.map((el,index) => (
                      <tr key = {index}>
                        <td className="inheader">
                          <b>{index+1}</b>
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
                          <b>{el.amount * 0.05}</b>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <br/>
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
                        <b>Guider Payments</b>
                      </td>
                      <td className="inheader" width="200">
                        <b>Bonus</b>
                      </td>
                    </tr>
                    {guiderHistory.map((el,index) => (
                      <tr key={index}>
                        <td className="inheader">
                          <b>{el.name}</b>
                        </td>
                        <td className="inheader" width="200">
                          <b>{el.amount}</b>
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
