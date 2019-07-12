import React, { Component } from "react";
import { Button } from "antd";
import "./index.less";

class page extends Component {
  render() {
    return (
      <div>
        <Button type="primary" className="btn inp">
          登录
        </Button>
      </div>
    );
  }
}

export default page;
