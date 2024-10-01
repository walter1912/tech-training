"use client";
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Icon } from "@shopify/polaris";
import { ArrowLeftIcon, ListBulletedFilledIcon } from "@shopify/polaris-icons";
import { routes } from "~/routes";

SideBarLeft.propTypes = {};

const SideBarLeftStyled = styled.nav<{ width?: string }>`
  width: ${({ width }) => width ?? "300px"};
  max-width: 300px;
  background-color: var(--p-color-bg-surface);
  border-top: 1px solid var(--p-color-border);
  border-right: 1px solid var(--p-color-border);

  & .info {
    padding: 8px 20px;
    justify-content: space-between;

    & span {
      font-weight: 600;
      color: var(--p-color-bg-fill-info-hover);
    }

    & .Polaris-Icon {
      margin-right: 0;
    }
  }
`;

const LinkStyled = styled(Link)(() => ({
  display: "flex",
  flexDirection: "row",
  fontSize: "var(--p-font-size-500)",
  paddingTop: "16px",
  paddingBottom: "16px",
  fontWeight: 600,
  margin: "0",
  "& .Polaris-Icon": {
    scale: "1.6",
    margin: "0 16px 0 20px",
  },
}));

function SideBarLeft() {
  return (
    <SideBarLeftStyled>
      <LinkStyled href={routes[0].path} className="border-bottom">
        <Icon source={ArrowLeftIcon} tone="base" />

        <span>{routes[0].title}</span>
      </LinkStyled>
      <div className="info flex-row">
        <span>Exercise</span>
        <Icon source={ListBulletedFilledIcon} tone="info" />
      </div>
      <div>
        {routes.slice(1).map((route, index) => (
          <LinkStyled key={index} href={route.path}>
            <Icon source={route.Icon} tone="base" />
            <span>{route.title}</span>
          </LinkStyled>
        ))}
      </div>
    </SideBarLeftStyled>
  );
}

export default SideBarLeft;
