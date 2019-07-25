import React from "react";
import "./index.less";
import { Icon } from "antd";

export default {
  UserName: {
    props: {
      size: "large",
      id: "userName",
      prefix: <Icon type="user" className="prefixIcon" />,
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
      type: "password",
      prefix: <Icon type="lock" className="prefixIcon" />,
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
      prefix: <Icon type="mobile" className="prefixIcon" />,
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
      prefix: <Icon type="mail" className="prefixIcon" />,
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
