import React, { Component } from "react";
import {
  Form,
  Input,
  Modal,
  Select,
  Row,
  Col,
  Button,
  Popover,
  Progress
} from "antd";
import Link from "next/link";
import "./register.less";

const FormItem = Form.Item;
const InputGroup = Input.Group;
const { Option } = Select;

const passwordStatusMap = {
  ok: <div className="success">強度：強</div>,
  pass: <div className="warning">強度：中</div>,
  poor: <div className="error">強度：弱</div>
};

const passwordProcessMap = {
  ok: "success",
  pass: "normal",
  poor: "exception"
};

@Form.create()
class Register extends Component {
  state = {
    count: 0,
    confirmDity: false,
    visible: false,
    help: "",
    profix: "86"
  };

  // componentDidUpdate() {
  //   const { form, register } = this.props;
  //   const account = form.getFieldValue("mail");
  //   if (register.status === "ok") {
  //     // 注册成功
  //   }
  // }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
    Modal.info({ title: "验证码已发送，请注意查收" });
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue("password");
    if (value && value.length > 9) {
      return "ok";
    }
    if (value && value.length > 5) {
      return "pass";
    }
    return "poor";
  };

  handlerSubmit = e => {
    e.PreventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { prefix } = this.state;
        dispatch({
          type: "register/submit",
          payload: {
            ...values,
            prefix
          }
        });
      }
    });
  };

  handlerConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  // 检查密码输入框密码强度
  checkConfirm = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;
    if (!value) {
      this.setState({
        help: "请输入密码",
        visible: !!value
      });
      callback("error");
    } else {
      this.setState({ help: "" });
      if (!visible) {
        this.setState({ visible: !!value });
      }
      if (value.length < 6) {
        callback("error");
      } else {
        const { form } = this.props;
        if (value && confirmDirty) {
          form.validateFields(["confirm"], { force: true });
        }
        callback();
      }
    }
  };

  changePrefix = value => {
    this.setState({ prefix: value });
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue("password");
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProcessMap[passwordStatus]}
          className="progress"
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { count, profix, help, visible } = this.state;
    return (
      <div className="main">
        <h3>注册</h3>
        <Form onSubmit={this.handlerSubmit}>
          <FormItem>
            {getFieldDecorator("mail", {
              rules: [
                {
                  required: true,
                  message: "请输入邮箱地址"
                },
                {
                  type: "mail",
                  message: "邮箱地址格式错误"
                }
              ]
            })(<Input size="large" placeholder="邮箱" />)}
          </FormItem>
          <FormItem help={help}>
            <Popover
              getPopupContainer={node => node.parentNode}
              content={
                <div style={{ padding: "4px 0" }}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>请至少输入6个字符</div>
                </div>
              }
              overlayStyle={{ width: 240 }}
              placement="right"
              visible={visible}
            >
              {getFieldDecorator("password", {
                rules: [
                  {
                    validator: this.checkPassword
                  }
                ]
              })(<Input size="large" type="password" placeholder="密码" />)}
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "请确认密码"
                },
                {
                  validator: this.checkConfirm
                }
              ]
            })(<Input size="large" type="password" placeholder="确认密码" />)}
          </FormItem>
          <FormItem>
            <InputGroup compact>
              <Select
                size="large"
                value={profix}
                onChange={this.changePrefix}
                style={{ width: "20%" }}
              >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
              </Select>
              {getFieldDecorator("mobile", {
                rules: [
                  {
                    required: true,
                    message: "请输入手机号"
                  },
                  {
                    pattern: /^\d{11}$/,
                    message: "手机号格式错误"
                  }
                ]
              })(
                <Input
                  size="large"
                  style={{ width: "80%" }}
                  placeholder="手机号"
                />
              )}
            </InputGroup>
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator("captcha", {
                  rules: [
                    {
                      required: true,
                      message: "请输入验证码"
                    }
                  ]
                })(<Input size="large" placeholder="请输入验证码" />)}
              </Col>
              <Col span={8}>
                <Button
                  size="large"
                  disabled={count}
                  className="getCaptcha"
                  onClick={this.onGetCaptcha}
                >
                  {count ? `${count} s` : "获取验证码"}
                </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button
              size="large"
              className="submit"
              type="primary"
              htmlType="submit"
            >
              注册
            </Button>
            <Link className="login" href="/login">
              <a>使用已有账户登录</a>
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Register;
