import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { UserContext } from "./UserContext";
import Error from "./Error";
import axios from "axios";
import Spinner from "./Spinner";

function Referals() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(null);
  // const [loading, setLoading] = useState(true);
  const {
    name,
    username,
    accountName,
    accountNo,
    bank,
    email,
    phone,
  } = user.user;
  const isEmpty = (obj) => {
    for (var i in obj) {
      return false;
    }
    return true;
  };
  const getUserData = () => {
    if (!user.user._id) {
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
          if (err.response.status === 500) {
            console.log("there was a problem with the server");
            return window.location.reload();
          }
          setResponse(err.response.data);
          setError(true);
          setTimeout(() => {
            return history.push("/login");
          }, 1000);
        });
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  if (isEmpty(user.user)) return <Spinner />;
  return (
    <div>
      {error ? (
        <Error
          response={response}
          setError={() => {
            setError(false);
            window.location.reload();
          }}
        />
      ) : null}

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
                <form style={{ textAlign: "left", color: "#fff" }}>
                  <h3>
                    <p style={{ color: "#FFFFFF" }}>Your account:</p>
                  </h3>

                  <table style={{ margin: "auto" }}>
                    <tbody>
                      <tr>
                        <td>
                          <p style={{ color: "#FFFFFF" }}>Account Name:</p>
                        </td>
                        <td>
                          <p style={{ color: "#FFFFFF" }}>{name}</p>
                        </td>
                      </tr>
                      <br />
                      <tr>
                        <td>
                          <p style={{ color: "#FFFFFF" }}>Username:</p>
                        </td>
                        <td>
                          <p style={{ color: "#FFFFFF" }}>{username}</p>
                        </td>
                      </tr>
                      <br />
                      <tr>
                        <td>
                          <p style={{ color: "#FFFFFF" }}>Phone:</p>
                        </td>
                        <td>
                          <p style={{ color: "#FFFFFF" }}>{phone}</p>
                        </td>
                      </tr>
                      <br />
                      <tr>
                        <td>
                          <p style={{ color: "#FFFFFF" }}>Bank Account Name:</p>
                        </td>
                        <td>
                          <p style={{ color: "#FFFFFF" }}>{accountName}</p>
                        </td>
                      </tr>
                      <br />
                      <tr>
                        <td>
                          <p style={{ color: "#FFFFFF" }}>
                            Bank Account Number:
                          </p>
                        </td>
                        <td>
                          <p style={{ color: "#FFFFFF" }}>{accountNo}</p>
                        </td>
                      </tr>
                      <br />
                      <tr>
                        <td>
                          <p style={{ color: "#FFFFFF" }}>Bank Name:</p>
                        </td>
                        <td>
                          <p style={{ color: "#FFFFFF" }}>{bank}</p>
                        </td>
                      </tr>
                      <br />

                      <tr>
                        <td>
                          <p style={{ color: "#FFFFFF" }}>E-mail address:</p>
                        </td>
                        <td>{email}</td>
                      </tr>
                      <br />
                      <tr>
                        <td>&nbsp;</td>
                        <td>
                          <input
                            disabled
                            type="submit"
                            value="Change Account data"
                            className="sbmt"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </header>
    </div>
  );
}

export default Referals;
