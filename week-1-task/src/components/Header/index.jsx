import React, { memo } from "react";
import PropTypes from "prop-types";
import Search from "./Search";
import { image, svg } from "~/assets";
import { createVar } from "@shopify/polaris-tokens";
import styles from "./styles/index.module.css";
import clsx from "clsx";
import Account from "./Account";
Header.propTypes = {};
 // 'rgba(...)'
function Header(props) {
  const { user, fullname } = props;
  return (
    <div className={clsx(styles.Header)}>
      <img src={image.logo} width={140} height={100} />
      <div style={{ width: "540px" }}>
        <Search />
      </div>
      <div className="inforAccount">
        <Account user={user} fullname={fullname} />
      </div>
    </div>
  );
}

export default memo(Header);