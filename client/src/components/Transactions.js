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
    if (!user.user._id) {
      axios
        .get("/users/user", { withCredentials: true })
        .then((res) => {
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
              setUser((prevState) => ({
                ...prevState,
                ...res.data,
              }));
            });
        })
        .catch((err) => {
          // if (err.response.status === 500) {
          //   return window.location.reload();
          // }
          setResponse(err.response.data);
          setError(true);
          // setTimeout(() => {
          //   return history.push("/login");
          // }, 1000);
        });
    }
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
      {/* {loading && <Spinner />} */}
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
                        <b>Guider Payments</b>
                      </td>
                      <td className="inheader" width="200">
                        <b>Bonus</b>
                      </td>
                    </tr>
                    {guiderHistory.map((el, index) => (
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
