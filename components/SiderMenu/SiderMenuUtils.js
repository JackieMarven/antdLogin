import pathToRegexp from "path-to-regexp";
import { urlToList } from "../../utils/pathTools";

export const getMenuMatches = (flatMenuKeys, path) => {
  flatMenuKeys.filter(item => {
    if (item) {
      return pathToRegexp(item).test(path);
    }
    return false;
  });
};

/**
 * 获得菜单子节点
 */
export const getDefaultCollapsedSubMenus = props => {
  const {
    location: { pathname },
    flatMenuKeys
  } = props;
  return urlToList(pathname)
    .map(item => getMenuMatches(flatMenuKeys, item)[0])
    .filter(item => item)
    .reduce((acc, curr) => [...acc, curr], ["/"]);
};

/**
 * 以递归方式展平数据
 * [{path:string},{path:string}] => {path,path2}
 * @param {menus} menuData
 */
export const getFlatMenuKeys = menuData => {
  let keys = [];
  menuData.forEach(item => {
    keys.push(item.path);
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
  });
  return keys;
};
