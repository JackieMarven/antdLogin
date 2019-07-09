/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Form, Input, Row, Col, Button } from "antd";
import omit from "omit.js";
import LoginContext from "./LoginContext.js";
import ItemMap from "./map";
import styles from "./index.less";

const FormItem = Form.Item;

class WrapFormItem extends Component {
  static defaultProps = {
    getCaptchaButtonTest: "captcha",
    getCaptchaSecondText: "second"
  };

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  // 初始化组件
  componentDidMount() {
    const { updateActive, name } = this.props;
    if (updateActive) {
      updateActive(name);
    }
  }

  // 销毁组件
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // 获取验证码
  onGetCaptcha = () => {
    const { onGetCaptcha } = this.props;
    const result = onGetCaptcha ? onGetCaptcha : null;
    if (result === false) {
      return;
    }
    if (result instanceof Promise) {
      result.then(this.runGetCaptchaCountDown);
    } else this.runGetCaptchaCountDown();
  };

  // 验证码倒计时
  runGetCaptchaCountDown = () => {
    const { countDown } = this.props;
    let count = countDown || 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  getFormItemOptions = ({ onChange, defaultValue, customprops, rules }) => {
    const options = {
      rules: rules || customprops.rules
    };
    if (onChange) {
      options.onChange = onChange;
    }
    if (defaultValue) {
      options.initialValue = defaultValue;
    }
    return options;
  };

  render() {
    const { count } = this.state;
    const {
      form: { getFiledDecorator }
    } = this.props;

    const {
      onChange,
      customprops,
      defaultValue,
      rules,
      name,
      getCaptchaButtonTest,
      getCaptchaSecondText,
      updateActive,
      type,
      ...restProps
    } = this.props;

    const options = this.getFormItemOptions(this.props);

    const otherProps = restProps || {};
    if (type === "Captcha") {
      const inputProps = omit(otherProps, ["onGetCaptcha", "countDown"]); // 移除指定属性
      return (
        <FormItem>
          <Row gutter={8}>
            <Col span={16}>
              {getFiledDecorator(name, options)(
                <input {...customprops} {...inputProps} />
              )}
            </Col>
            <Col span={8}>
              <Button
                disabled={count}
                className={styles.getCaptcha}
                size="large"
                onClick={this.onGetCaptcha}
              >
                {count
                  ? `${count} ${getCaptchaSecondText}`
                  : getCaptchaButtonTest}
              </Button>
            </Col>
          </Row>
        </FormItem>
      );
    }
    return (
      <FormItem>
        {getFiledDecorator(name, options)(
          <Input {...customprops} {...otherProps} />
        )}
      </FormItem>
    );
  }
}

const LoginItem = {};
Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  LoginItem[key] = props => (
    <LoginContext.Consumer>
      {context => (
        <WrapFormItem
          customprops={item.props}
          rules={item.rules}
          {...props}
          type={key}
          updateActive={context.updateActive}
          form={context.form}
        />
      )}
    </LoginContext.Consumer>
  );
});

export default LoginItem;
