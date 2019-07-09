import React, { Component } from "react";
import { Alert, Checkbox, Icon } from "antd";
import Link from "next/link";
import Login from "../../components/login";
import styles from "./index.less";

const { Tab, Submit, UserName, PassWord, Mobile, Captcha } = Login;

class LoginPage extends Component {
  state = {
    type: "account",
    autoLogin: true
  };

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, value) => {
    const { type } = this.state;

    // 提交操作
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked
    });
  };

  renderMessage = content => {
    <Alert
      style={{ marginBottom: 24 }}
      message={content}
      type="error"
      showIcon
    ></Alert>;
  };

  render() {
    const { Login, submitting } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab="账号密码登录">
            <UserName name="userName" placeholder="" />
            <PassWord name="passWord" />
          </Tab>
          <Tab key="mobile" tab="手机号登录">
            <Mobile name="mobile" />
            <Captcha name="captcha" />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
            <a style={{ float: "right" }} href="">
              忘记密码
            </a>
          </div>
          <Submit loading={submitting}>登录</Submit>
          <div className={styles.other}>
            其他登录方式
            <Icon type="qq" className={styles.icon} theme="outlined" />
            <Icon type="wechat" className={styles.icon} theme="outlined" />
            <Icon
              type="alipay-circle"
              className={styles.icon}
              theme="outlined"
            />
            <Link className={styles.register} href="">
              注册用户
            </Link>
          </div>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
