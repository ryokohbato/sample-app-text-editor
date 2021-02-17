const productionConfig = require('./webpack.production.config');
const path = require("path");

module.exports = {
  ...productionConfig,

  mode: "development",
  devtool: "inline-source-map",
};
