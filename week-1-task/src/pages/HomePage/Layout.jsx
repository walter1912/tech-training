import React from "react";
import PropTypes from "prop-types";
import { Link, Outlet } from "react-router-dom";

Layout.propTypes = {};

function Layout() {
  return (
    <div style={{ width: "100vw" }}>
      <nav style={{ maxWidth: "30vw" }}>
        <ul>
          <li>
            <Link to="/account">Account</Link>
          </li>
          <li>
            <Link to="/address">Addresses</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <div style={{ maxWidth: "70vw" }}> <Outlet /> </div>
    </div>
  );
}
export default Layout;
