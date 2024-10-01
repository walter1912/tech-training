"use client";
import React from "react";
import { useAppSelector } from "~/lib/hooks";
import AccountPage from "~/pages/AccountPage";

page.propTypes = {};

function page(props) {
  const addresses = useAppSelector((state) => state.addresses);
  const accounts = useAppSelector((state) => state.accounts);

  return <AccountPage accounts={accounts.infor} addresses={addresses} />;
}

export default page;
