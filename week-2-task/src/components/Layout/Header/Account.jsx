"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Avatar } from "@shopify/polaris";
import { getAccount } from "~/services/accountService";

Account.propTypes = {};

const AccountStyled = styled.div((props) => ({
  alignItems: "center",
  "& .infor": {
    padding: "var(--p-space-100) var(--p-space-150)",
  },
  "& .name": {
    fontWeight: "var(--p-font-weight-semibold)",
  },
}));
function Account(props) {
  // use combination: useState and useEffect to render and update account in account.json
  const [account, setAccount] = useState({fullname:null, shortname: null, email: null});
  useEffect(() => {
    async function get() {
      const data = await getAccount();
      if (data.fullname != account.fullname) {
        setAccount(data);
        console.log("change account");
      }
    }
    //  I use this interval function, but it is render when I update account.json (it is not 10s circle), I dont know reason
    const getAccountIt = setInterval(() => {
      get();
    }, 1000);
    return () => {
      clearInterval(getAccountIt);
    };
  }, [account]);
  // with this above pattern I must add this block to avoid error.
  if(!account) return <div>Loading...</div>

  return (
    <AccountStyled className="flex-row">
      <Avatar initials={account.shortname} name={account.fullname} size="xl" />
      <div className="infor flex-column">
        <div className="name"> {account.fullname}</div>
        <div className="description">New marchant</div>
      </div>
    </AccountStyled>
  );
}

export default Account;
