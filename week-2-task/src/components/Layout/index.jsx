"use client";
import React from "react";
import Header from "./Header";
import SideBarLeft from "./SideBarLeft";
import Footer from "./Footer";
import { Grid, Page } from "@shopify/polaris";

Layout.propTypes = {};

function Layout({ children }) {
  
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
