const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = function (config) {
  config.plugins.push(new ErrorOverlayPlugin());
  config.devtool = 'cheap-module-source-map';
};
