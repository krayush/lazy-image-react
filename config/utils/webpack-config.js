var helpers = require("./helpers");
// Note: Don't change it to self-executing function as it disrupts the editor's suggest mode
module.exports = function () {
  var environment = helpers.getEnvironment();
  var entryPoints = {
      bundle: helpers.getAbsolutePath("index.js")
    },
    devServerConfig = {
      host: "localhost",
      port: 80,
      hot: environment === "development",
      inline: environment === "development",
      compress: true,
      disableHostCheck: true,
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    },
    pageInfo = {
      title: "PAGE TITLE",
      faviconPath: "/favicon.ico",
      baseURL: "/"
    };
  var webpackConfig = {
    entryPoints: entryPoints,
    devServerConfig: devServerConfig,
    pageInfo: pageInfo
  };
  return webpackConfig;
};
