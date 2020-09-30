import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="container admin_menu" style={{ padding: "0px 0" }}>
      <div className="row">
        <div className="col-sm-12">
          <ul>
            <li>
              <Link to="/dashboard" style={{ width: "80px" }}>
                <i className="ti-dashboard"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/deposit" style={{ width: "80px" }}>
                <i className="ti-cloud"></i>
                <span>Deposit</span>
              </Link>
            </li>

            <li>
              <Link to="/transactions" style={{ width: "80px" }}>
                <i className="ti-briefcase"></i>
                <span>Transactions</span>
              </Link>
            </li>

            <li>
              <Link to="/edit_account" style={{ width: "80px" }}>
                <i className="ti-lock"></i>
                <span>Account</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
