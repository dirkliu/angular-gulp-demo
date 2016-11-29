var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var Clean = require('clean-webpack-plugin');
var baseConfig = require('./base.config')
var scripts = require('./scripts');


var config =  _.merge( baseConfig, {
    entry: _.merge({
            bundle: './uyun/src/main.jsx'
        },
        scripts.chunks),
    output: {
        path: path.resolve(__dirname, '../uyun/web/build'),
        filename: '[name].js',
        publicPath: 'build/',
        chunkFilename: 'chunk.[id].js',
        pathinfo: true
    },
    devtool: 'cheap-module-source-map ',
    plugins: [
        new Clean('../uyun/web/build'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            minimize: true,
            sourceMap: false,
            exclude: [
                /node_modules/,
                /bower_components/
            ]
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ].concat(baseConfig.plugins)
});

module.exports = config;