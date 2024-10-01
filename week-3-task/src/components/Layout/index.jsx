"use client";
import React, { useEffect, useRef } from "react";
import Header from "./Header";
import SideBarLeft from "./SideBarLeft";
import Footer from "./Footer";
import { Grid, Page } from "@shopify/polaris";
import { useAppStore } from "~/lib/hooks";
import { accountsActions } from "~/lib/features/accounts/accountsSlice";
import { getAccount } from "~/services/accountService";
import { getAddress } from "~/services/addressService";
import { addressesActions } from "~/lib/features/addresses/addressesSlice";

Layout.propTypes = {};

function Layout({ children }) {
  const store = useAppStore();

  // Create multiple refs
  const initializedAddresses = useRef(false);
  const initializedAccounts = useRef(false);

  useEffect(() => {
    async function get() {
      try {
        const account = await getAccount();        
        if (!initializedAccounts.current) {
          store.dispatch(accountsActions.setInfor(account));
          initializedAccounts.current = true;
          
        }
      } catch (err) {
        console.error(err);
      }
      try {
        let data = await getAddress();
        // initialization addresses in store
        if (!initializedAddresses.current) {
          store.dispatch(addressesActions.setList(data));
          initializedAddresses.current = true;
        }
      } catch (err) {
        console.error(err);
      }
    }
    get();
    console.log("fetch accounts and addresses");
    
  }, []);

  console.log("declare store and initalizeRef ...");
  
  return (
    <Page fullWidth>
      <Header />
      <Grid>
        <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }}>
          <SideBarLeft />
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 9, sm: 9, md: 9, lg: 9, xl: 9 }}>
          {children}
        </Grid.Cell>
      </Grid>
      <Footer />
    </Page>
  );
}

export default Layout;
