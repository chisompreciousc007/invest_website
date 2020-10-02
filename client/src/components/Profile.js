import React, { useState, useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { UserContext } from "./UserContext";

function Referals({}) {
  const { user, setUser } = useContext(UserContext);
  const {
    _id,
    name,
    username,
    accountName,
    accountNo,
    bank,
    email,
    phone,
  } = user.user;

  return (
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
