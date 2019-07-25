import React, { PureComponent, Suspense } from "react";
import { Layout } from "antd";
import classNames from "classnames";
import Link from "next/link";
import PageLoading from "../../src/components/PageLoading";
import { getDefaultCollapsedSubMenus } from "./SiderMenuUtils";
import { title } from "../../defaultSetting";
import "./index.less";

const BaseMenu = React.lazy(() => import("./BaseMenu"));
const { Sider } = Layout;

let firstMount = true;

class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: getDefaultCollapsedSubMenus(props)
    };
  }

  componentDidMount() {
    firstMount = false;
  }

  // 从 props 获取原生 state
  static getDerivedStateFromProps(props, state) {
    const { pathname, flatMenuKeysLen } = state;
    if (
      props.location.pathname !== pathname ||
      props.flatMenuKeys.length !== flatMenuKeysLen
    ) {
      return {
        pathname: props.location.pathname,
        flatMenuKeysLen: props.flatMenuKeys.length,
        openKeys: getDefaultCollapsedSubMenus(props)
      };
    }
    return null;
  }

  isMainMenu = key => {
    const { menuData } = this.props;
    return menuData.some(item => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  handleOpenChange = openKeys => {
    const moreThanOne = openKeys.filter(
      openKey => this.isMainMenu(openKey).length > 1
    );
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys] // .pop() 删除数组最后一个元素，并返回其值
    });
  };

  render() {
    const {
      logo,
      collapsed,
      onCollapse,
      fixSiderbar,
      theme,
      isMobile
    } = this.props;
    const { openKeys } = this.state;
    const defaultProps = collapsed ? {} : { openKeys };

    const siderClassName = classNames("sider", {
      ["fixSiderBar"]: fixSiderbar,
      ["light"]: theme === "light"
    });

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={collapse => {
          if (firstMount || !isMobile) {
            onCollapse(collapse);
          }
        }}
        width={256}
        theme={theme}
        className={siderClassName}
      >
        <div className="logo" id="logo">
          <Link href="/">
            <img src={logo} alt="logo" />
            <h1>{title}</h1>
          </Link>
        </div>
        <Suspense fallback={<PageLoading />}>
          <BaseMenu
            {...this.props}
            mode="inline"
            handleOpenChange={this.handleOpenChange}
            onOpenChange={this.handleOpenChange}
            style={{ padding: "16px 0", width: "100%" }}
            {...defaultProps}
          ></BaseMenu>
        </Suspense>
      </Sider>
    );
  }
}

export default SiderMenu;
