import React, { Component } from "react";
import { Alert, Checkbox, Icon } from "antd";
import Link from "next/link";
import Logins from "../../components/login";
import "./index.less";

const { Tab, Submit, UserName, PassWord, Mobile, Captcha } = Logins;

class LoginPage extends Component {
  state = {
    type: "account",
    autoLogin: true
  };

  onTabChange = type => {
    this.setState({ type });
  };

  // 提交操作
  handleSubmit = () => {};

  // 获取验证码
  onGetCaptcha = () => {};

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
    // const { login } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className="main">
        <Logins
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab="账号密码登录">
            <UserName
              name="userName"
              placeholder="用户名"
              rules={[
                {
                  required: true,
                  message: "请输入用户名"
                }
              ]}
            />
            <PassWord
              name="passWord"
              placeholder="密码"
              rules={[
                {
                  required: true,
                  message: "请输入密码"
                }
              ]}
              onPressEnter={e => {
                e.preventDefault();
                this.loginForm.validateFields(this.handleSubmit);
              }}
            />
          </Tab>
          <Tab key="mobile" tab="手机号登录">
            <Mobile
              name="mobile"
              placeholder="手机号"
              rules={[
                {
                  required: true,
                  message: "请输入手机号"
                },
                {
                  pattern: /^1\d{10}$/,
                  message: "请输入正确的号码"
                }
              ]}
            />
            <Captcha
              name="captcha"
              placeholder="验证码"
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText="获取验证码"
              getCaptchaSecondText="秒"
              rules={[
                {
                  required: true,
                  message: "请输入验证码"
                }
              ]}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
            <a style={{ float: "right" }} href="">
              忘记密码
            </a>
          </div>
          <Submit>登录</Submit>
          <div className="other">
            其他登录方式
            <Icon type="qq" className="icon" theme="outlined" />
            <Icon type="wechat" className="icon" theme="outlined" />
            <Icon type="alipay-circle" className="icon" theme="outlined" />
            <Link href="">
              <a className="register">注册用户</a>
            </Link>
          </div>
        </Logins>
      </div>
    );
  }
}

export default LoginPage;
