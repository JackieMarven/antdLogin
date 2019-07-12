import React, { Component, Fragment } from "react";
// import DocumentTitle from "react-document-title";
import Link from "next/link";
import GlobalFooter from "../components/GlobalFooter";
import "./UserLayout.less";
import { Icon } from "antd";

const links = [
  {
    key: "help",
    title: "帮助",
    href: ""
  },
  {
    key: "privacy",
    title: "隐私",
    href: ""
  },
  {
    key: "terms",
    title: "团队",
    href: ""
  }
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2019 神威体验技术出品
  </Fragment>
);

class UserLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="container">
        <div className="content">
          <div className="top">
            <div className="header">
              <Link href="/">
                <img alt="logo" className="logo" />
                <span className="title">南京大学图书管理系统</span>
              </Link>
            </div>
            <div className="desc">致力于研究装X领域</div>
          </div>
          {children}
        </div>
        <GlobalFooter links={links} copyright={copyright} />
      </div>
    );
  }
}

export default UserLayout;
