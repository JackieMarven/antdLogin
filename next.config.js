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
  },
  // eslint-disable-next-line no-unused-vars
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000
        }
      }
    });
    return config;
  }
});
