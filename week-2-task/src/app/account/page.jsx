"use client";
import React, { useEffect, useState } from "react";
import AccountPage from "~/pages/AccountPage";
import { getAccount } from "~/services/accountService";
import { getAddress } from "~/services/addressService";

page.propTypes = {};

function page(props) {
  const [accountInit, setAccount] = useState({});
  const [addressInit, setAddress] = useState([]);
  useEffect(() => {
    async function get() {
      const account = await getAccount();
      setAccount(account);
      const address = await getAddress();
      setAddress(address);
    }      
      get();
  }, []);
  // if dont have this if block, UI will render bug: accountInit and addressInit is null in component <AccountPage  />
  if (!accountInit || addressInit.length < 1) return <div>Loading...</div>;
  return <AccountPage accountInit={accountInit} addressInit={addressInit} />;
}

export default page;
