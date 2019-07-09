import React, { Component } from "react";
import PropTypes from "prop-types";
import LoginContext from "./LoginContext";
import classNames from "classnames";
import { Form, Tabs } from "antd";
import LoginItem from "./LoginItem";
import LoginTab from "./LoginTab";
import LoginSubmit from "./LoginSubmit";
import styles from "./index.less";

class Login extends Component {
  static propTypes = {
    className: PropTypes.string,
    defaultActiveKey: PropTypes.string,
    onTabChange: PropTypes.func,
    onSubmit: PropTypes.func
  };

  static defaultProps = {
    className: "",
    defaultActiveKey: "",
    onTabChange: () => {},
    onSubmit: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      type: props.defaultActiveKey,
      tabs: [],
      active: {}
    };
  }

  onSwitch = type => {
    this.setState({ type });
    const { onTabChange } = this.props;
    onTabChange(type);
  };

  getContext = () => {
    const { tabs } = this.state;
    const { form } = this.props;
    return {
      tabUtil: {
        addtab: id => {
          this.setState({
            tabs: [...tabs, id]
          });
        },
        removeTab: id => {
          this.setState({
            tabs: tabs.filter(currentId => currentId !== id)
          });
        }
      },
      form: {
        ...form
      },
      updateActive: activeItem => {
        const { type, active } = this.state;
        if (active[type]) {
          active[type].push(activeItem);
        } else {
          active[type] = [activeItem];
        }
        this.setState({ active });
      }
    };
  };

  handleSubmit = e => {
    e.preventDefault();
    const { active, type } = this.state;
    const { form, onSubmit } = this.props;
    const activeFields = active[type];
    form.validateFields(activeFields, { force: true }, (err, values) => {
      onSubmit(err, values);
    });
  };

  render() {
    const { className, children } = this.props;
    const { type, tabs } = this.state;
    const TabChildren = [];
    const otherChildren = [];

    React.Children.forEach(children, item => {
      if (!item) {
        return;
      }
      if (item.type.typeName === "LoginTab") {
        TabChildren.push(item);
      } else {
        otherChildren.push(item);
      }
    });

    return (
      // <LoginContext.Provider value={this.getContext()}>
      <div className={classNames(className, styles.login)}>
        <Form onSubmit={this.handleSubmit}>
          {tabs.length ? (
            <React.Fragment>
              <Tabs
                animated={false}
                className={styles.tabs}
                activeKey={type}
                onchange={this.onSwitch}
                value={this.getContext()}
              >
                {TabChildren}
              </Tabs>
            </React.Fragment>
          ) : (
            children
          )}
        </Form>
      </div>
      // </LoginContext.Provider>
    );
  }
}

Login.Tab = LoginTab;
Login.Submit = LoginSubmit;
Object.keys(LoginItem).forEach(item => {
  Login[item] = LoginItem[item];
});

// 经 Form.create() 包装过的组件会自带 this.props.form 属性
// 详情见 https://ant.design/components/form-cn/
export default Form.create()(Login);
