"use client";
import React from "react";
import { useAppSelector } from "~/lib/hooks";
import AddressPage from "~/pages/AddressPage";

function page() {
  const addresses = useAppSelector((state) => state.addresses);
  return <AddressPage addressesTable={addresses.table} />;
}
export default page;
