"use client"
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { image } from "~/assets";
import Search from "./Search";
import Account from "./Account";

Header.propTypes = {};

const HeaderStyled = styled.header((props) => ({
  backgroundColor: "var(--p-color-bg-surface)",
  width: "100%",
  height: "100px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 var(--p-space-600)",
  marginBottom: "0",
}));

function Header(props) {
  return (
    <HeaderStyled>
      <Image src={image.logo} width={140} height={100} />
      <div style={{ width: "540px" }}>
        {/* search without logic relavant to main process, I just copy from Polaris Component */}
        <Search />
      </div>
      <Account />
    </HeaderStyled>
  );
}

export default Header;
