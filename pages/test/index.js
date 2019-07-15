import React, { Component } from "react";
// import { Button } from "antd";
// import UserLayout from "../../layouts/UserLayouts";
import LoginHeader from "../../components/LoginHeader";
import "./index.less";

class page extends Component {
  render() {
    return (
      <div>
        <LoginHeader>
          <p>Hello world</p>
        </LoginHeader>
      </div>
    );
  }
}

export default page;
