import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./SideBarLeft.module.css";
import { Link } from "react-router-dom";
import { routes } from "~/routes";
import { ArrowLeftIcon, HomeFilledIcon, ListBulletedFilledIcon } from "@shopify/polaris-icons";
import { Icon } from "@shopify/polaris";
SideBarLeft.propTypes = {};

function SideBarLeft(props) {
  return (
    <nav className={clsx(styles.SideBarLeft)}>
      <Link
        key={"home"}
        to={routes[0].path}
        className={clsx(styles.Link, "link-main", "border-bottom")}
        style={{ paddingTop: "20px", paddingBottom: "20px", fontWeight: 600 }}
      >
        <Icon source={ArrowLeftIcon} tone="base" />
        <span style={{ marginLeft: "10px" }}>{routes[0].title}</span>
      </Link>
      <div className={clsx(styles.infor, "flex-between-row")}>
        <span style={{fontWeight: 600, color:"var(--p-color-bg-fill-info-hover)"}}>Exercises</span>
        <Icon source={ListBulletedFilledIcon} tone="info" />
      </div>
      <div>
        {routes.slice(1).map((route, index) => (
          <Link
            key={index}
            to={route.path}
            className={clsx(styles.Link, "link-main")}
          >
            <Icon source={HomeFilledIcon} tone="base" />
            <span style={{ marginLeft: "10px" }}>{route.title}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default SideBarLeft;
