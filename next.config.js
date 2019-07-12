const withLess = require("@zeit/next-less");

if (typeof require !== "undefined") {
  // eslint-disable-next-line no-unused-vars
  require.extensions[".less"] = file => {};
}

module.exports = withLess({
  // cssModules: false,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]"
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1890ff" }
  },
  antdLessLoaderOptions: {
    javascriptEnabled: true
  }
});
