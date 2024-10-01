import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
import { Route, Router, Routes } from "react-router-dom";
import styles from "./styles/Layout.module.css";
import clsx from "clsx";
import { routes } from "~/routes";
import SideBarLeft from "./SideBarLeft";
import HomePage from "~/pages/HomePage";
import Account from "./Account";
import Address from "./Address";
import { toCapitalize } from "./Header/Account";
Layout.propTypes = {};

function Layout(props) {
  const userPure = localStorage.getItem("inforAccount");
  const inforAccount = userPure ? JSON.parse(userPure) : null;
  const fullnam = inforAccount
    ? toCapitalize(inforAccount.fullname)
    : "Eric Walter";
  const [user, setUser] = useState(inforAccount ?? {fullnam});
  const [fullname, setFullname] = useState(fullnam);
  useEffect(()=> {
    console.log("changed user");
  }, [setUser])
  return (
    <div className={clsx(styles.Layout)}>
      <Header user={user} setUser={setUser} fullname={fullname} />
      <div className={clsx(styles.mainContainer)}>
        <SideBarLeft />
        <div style={{ flex: 1, padding: "10px" }}>
          <Routes>
            {/* {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                element={route.main}
              />
            ))} 
       
            */}
            <Route path="/" element={<HomePage />} />
            <Route
              path="/account"
              element={<Account user={user} setUser={setUser} setFullname={setFullname} />}
            />
            <Route path="/address" element={<Address />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
