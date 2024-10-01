"use client";
import React from "react";
import styled from "styled-components";
import { Avatar } from "@shopify/polaris";
import {  useAppSelector } from "~/lib/hooks";

Account.propTypes = {};

const AccountStyled = styled.div(() => ({
  alignItems: "center",
  "& .infor": {
    padding: "var(--p-space-100) var(--p-space-150)",
  },
  "& .name": {
    fontWeight: "var(--p-font-weight-semibold)",
  },
}));
function Account() {
  const account = useAppSelector((state) => state.accounts);
 
  return (
    <AccountStyled className="flex-row">
      <Avatar
        initials={account.infor.shortname}
        name={account.infor.fullname}
        size="xl"
      />
      <div className="infor flex-column">
        <div className="name"> {account.infor.fullname}</div>
        <div className="description">New marchant</div>
      </div>
    </AccountStyled>
  );
}

export default Account;
