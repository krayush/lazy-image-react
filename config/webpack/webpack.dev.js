const helpers = require('../utils/helpers');
const webpackMerge = require('webpack-merge');
const config = require('./webpack.common')();

module.exports = function () {
    return webpackMerge(config, {
        output: {
            filename: '[name].js',
            path: helpers.getAbsolutePath('dist')
        }
    });
};
