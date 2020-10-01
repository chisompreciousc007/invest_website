import React, { useState, useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { UserContext } from "./UserContext";
import NavBar from "./NavBar";

function Transactions({}) {
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
                        <b>Transactions</b>
                      </td>
                      <td className="inheader" width="200">
                        <b>Amount</b>
                      </td>
                      <td className="inheader" width="170">
                        <b>Date</b>
                      </td>
                    </tr>
                    <tr>
                      <td className="inheader">
                        <b>Paid</b>
                      </td>
                      <td className="inheader" width="200">
                        <b>5000</b>
                      </td>
                      <td className="inheader" width="170">
                        <b>12-02-2020</b>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">Total Investment:</td>
                      <td align="right">
                        <b>123456</b>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">Total Recieved:</td>
                      <td align="right">
                        <b>123456</b>
                      </td>
                    </tr>
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
                      <td className="inheader" width="170">
                        <b>Date</b>
                      </td>
                    </tr>
                    <tr>
                      <td className="inheader">
                        <b>User</b>
                      </td>
                      <td className="inheader" width="200">
                        <b>5000</b>
                      </td>
                      <td className="inheader" width="170">
                        <b>12-02-2020</b>
                      </td>
                    </tr>
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
