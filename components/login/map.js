import React from "react";
import styles from "./index.less";
import { Icon } from "antd";

export default {
  UserName: {
    props: {
      size: "large",
      id: "userName",
      prefix: <Icon type="user" className={styles.prefixIcon} />,
      placeholder: "admin"
    },
    rules: [
      {
        required: true,
        message: "Please enter username"
      }
    ]
  },
  PassWord: {
    props: {
      size: "large",
      id: "passWord",
      prefix: <Icon type="lock" className={styles.prefixIcon} />,
      placeholder: "admin"
    },
    rules: [
      {
        required: true,
        message: "Please enter password"
      }
    ]
  },
  Mobile: {
    props: {
      size: "large",
      id: "mobile",
      prefix: <Icon type="mobile" className={styles.prefixIcon} />,
      placeholder: "Please enter mobile number"
    },
    rules: [
      {
        required: true,
        message: "Please enter mobile number"
      }
    ]
  },
  Captcha: {
    props: {
      size: "large",
      id: "captcha",
      prefix: <Icon type="mail" className={styles.prefixIcon} />,
      placeholder: "captcha"
    },
    rules: [
      {
        required: true,
        message: "Please enter Captcha"
      }
    ]
  }
};
