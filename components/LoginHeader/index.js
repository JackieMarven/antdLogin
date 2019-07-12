import React from "react";
import Link from "next/link";
import "./index.less";

const LoginHeader = () => {
  return (
    <div className="top">
      <div className="header">
        <Link href="/">
          <img alt="logo" className="logo" />
          <span className="title">南京大学图书管理系统</span>
        </Link>
      </div>
      <div className="desc">致力于研究装X领域</div>
    </div>
  );
};

export default LoginHeader;
