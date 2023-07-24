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
                <i className="ti-money"></i>
                <span>PH/GH</span>
              </Link>
            </li>

            <li>
              <Link to="/transactions" style={{ width: "80px" }}>
                <i className="ti-stats-up"></i>
                <span>Transacts</span>
              </Link>
            </li>

            <li>
              <Link to="/edit_account" style={{ width: "80px" }}>
                <i className="ti-user"></i>
                <span>Profile</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
