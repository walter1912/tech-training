import React, { memo } from "react";
import PropTypes from "prop-types";
import { Avatar } from "@shopify/polaris";
import clsx from "clsx";
import styles from "./styles/Account.module.css";
Account.propTypes = {};
export const toCapitalize = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
export const getFirstLetters = (str) => {
  return str
    .split(" ") // Chia chuỗi thành mảng các từ
    .map((word) => word.charAt(0)) // Lấy chữ cái đầu tiên của mỗi từ
    .join(""); // Ghép các chữ cái đầu tiên thành một chuỗi
};
function Account(props) {
  const {user, fullname} = props
  
  return (
    <div className={clsx(styles.Account)}>
      <Avatar
        initials={getFirstLetters(fullname)}
        name={fullname}
        size="xl"
      />
      <div className={clsx(styles.infor)}>
        <div className={clsx(styles.name)}> {fullname}</div>
        <div className={clsx(styles.description)}>New marchant</div>
      </div>
    </div>
  );
}

export default memo(Account);
