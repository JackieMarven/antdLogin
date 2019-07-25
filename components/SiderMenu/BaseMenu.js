import React, { PureComponent } from "react";
import classNames from "classnames";
import { isUrl } from "../../utils/utils";
import { urlToList } from "../../utils/pathTools";
import { getMenuMatches } from "./SiderMenuUtils";
import { Icon, Menu } from "antd";
import Link from "next/link";
import IconFont from "../../src/components/IconFont/index";
import "./index.less";
import SubMenu from "antd/lib/menu/SubMenu";

const getIcon = icon => {
  if (typeof icon === "string") {
    if (isUrl(icon)) {
      return (
        <Icon
          component={() => <img src={icon} alt="icon" className="icon" />}
        />
      );
    }
    if (icon.startsWith("icon-")) {
      return <IconFont type={icon} />;
    }
    return <Icon type={icon} />;
  }
  return icon;
};

// PureComponent 用于提升性能
class BaseMenu extends PureComponent {
  // 获得菜单子节点
  getNavMenuItems = menuData => {
    if (!menuData) {
      return [];
    }
    return menuData
      .filter(item => item.name && !item.hideInmenu)
      .map(item => this.getSubMenuOrItem(item))
      .filter(item => item);
  };

  getSelectedMenuKeys = pathname => {
    const { flatMenuKeys } = this.props;
    return urlToList(pathname).map(itemPath =>
      getMenuMatches(flatMenuKeys, itemPath).pop()
    );
  };

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = item => {
    if (
      item.children &&
      !item.hideChildrenInMenu &&
      item.children.some(child => child.name)
    ) {
      const { name } = item;
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{name}</span>
              </span>
            ) : (
              name
            )
          }
          key={item.path}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    }
    return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
  };

  /**
   * 判断是否是http 链接,返回Link 或 a
   */
  getMenuItemPath = item => {
    const { name } = item;
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target } = item;

    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={item.path} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }

    const { location, isMobile, onCollapse } = this.props;
    return (
      <Link
        href={itemPath}
        target={target}
        replace={itemPath === location.pathname}
        onClick={
          isMobile
            ? () => {
                onCollapse(true);
              }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  // 地址转换
  conversionPath = path => {
    if (path && path.indexOf("http") === 0) {
      return path;
    }
    return `/${path || ""}`.replace(/\/+/g, "/");
  };

  // 获取弹出容器
  getPopupContainer = (fixedHeader, layout) => {
    if (fixedHeader && layout === "topmenu") {
      return this.wrap;
    }
    return document.body;
  };

  getRef = ref => {
    this.wrap = ref;
  };

  render() {
    const {
      openKeys,
      theme,
      mode,
      location: { pathname },
      className,
      collapsed,
      fixedHeader,
      layout
    } = this.props;

    // 如果路径名称不能匹配到，使用最接近 parent's keys
    let selectedKeys = this.getSelectedMenuKeys(pathname);
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    let props = {};
    if (openKeys && !collapsed) {
      props = {
        openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys
      };
    }
    const { handleOpenChange, style, menuData } = this.props;
    const cls = classNames(className, {
      "top-nav-menu": mode === "horizontal"
    });
    return (
      <>
        <Menu
          key="Menu"
          mode={mode}
          theme={theme}
          onOpenChange={handleOpenChange}
          selectedKeys={selectedKeys}
          style={style}
          className={cls}
          {...props}
          getPopupContainer={() => this.getPopupContainer(fixedHeader, layout)}
        >
          {this.getNavMenuItems(menuData)}
        </Menu>
        <div ref={this.getRef} />
      </>
    );
  }
}

export default BaseMenu;
