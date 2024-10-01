"use client";
import React, { useEffect, useState } from "react";
import AddressPage from "~/pages/AddressPage";
import { getAddress } from "~/services/addressService";

function page(props) {
  const [addressesTable, setAddressesTable] = useState([]);
  useEffect(() => {
    async function get() {
      try {
        let data = await getAddress();
        console.log("data: ", data);
        setAddressesTable((pre) => {
          return data.map((item) => [item.address, item.city]);
        });
      } catch (err) {
        console.error(err);
      }
    }
    // use setInterval to track addresses.json, because without useContext or Redux, I dont know how to control the change of addresses.json
    const intervalId = setInterval(get(), 5000);
    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);
  if (addressesTable.length < 1) return <div>Loading...</div>;
  return <AddressPage addressesTable={addressesTable} />;
}
export default page;
