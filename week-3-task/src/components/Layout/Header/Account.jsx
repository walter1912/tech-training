"use client";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Avatar } from "@shopify/polaris";
import { getAccount } from "~/services/accountService";
import { useAppDispatch, useAppSelector, useAppStore } from "~/lib/hooks";
import { accountsActions } from "~/lib/features/accounts/accountsSlice";

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
