// Common Webpack configuration used by webpack.config.development and webpack.config.production

const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../utils/webpack-config')();
const helpers = require('../utils/helpers');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isDevServer = helpers.isWebpackDevServer();
const environment = helpers.getEnvironment();

module.exports = function () {
    return {
        entry: webpackConfig.entryPoints,
        resolve: {
            extensions: ['.jsx', '.js', '.json'],
            modules: [
                helpers.getAbsolutePath('node_modules')
            ]
        },
        output: {
            publicPath: '/'
        },
        module: {
            loaders: [{
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components|webfont.config.js)/,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'url-loader',
                query: {
                    limit: 8192,
                    name: 'images/[name].[ext]?[hash]'
                }
            }]
        },
        plugins: [
            new CleanWebpackPlugin([
                'dist'
            ], {
                root: helpers.getAbsolutePath('/')
            }),
            new CopyWebpackPlugin([{
                from: helpers.getAbsolutePath('/assets/**/*.*'),
                to: helpers.getAbsolutePath('/dist')
            }]),
            new webpack.DefinePlugin({
                isDevServer,
                "process.env": {
                    NODE_ENV: JSON.stringify(environment)
                }
            })
        ]
    };
};
