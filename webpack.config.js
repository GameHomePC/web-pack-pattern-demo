'use strict';

const NODE_ENV = process.env.NODE_ENV || "development";
const webpack = require("webpack");
const path = require('path');
const config = require("./config-path.json");

module.exports = {
    context: __dirname + "/frontend",
    entry: {
        app: "./app",
        common: "./global"
    },

    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: "[name].js",
        library: "[name]"
    },

    watch: NODE_ENV == "development",

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV == "development" ? "cheap-inline-module-source-map" : null,

    plugins: [
        /* при ошибке не создаёт файлы */
        new webpack.NoErrorsPlugin(),
        /* создаёт отдельный скрипт common.js */
        new webpack.optimize.CommonsChunkPlugin({
            name: "global"
        })
        /* подключени глобальных библиотек ProvidePlugin */
        //new webpack.ProvidePlugin({
        //    _: 'lodash'
        //})
    ],

    resolve: {
        root: [
            path.resolve('./frontend/lib'),
            path.resolve('./bower_components')
        ],
        //alias: {
        //    lib: "lib"
        //}
    },

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: wrapRegexp(/\/node_modules\//, 'exclude'), // типо должно ускорить сборку (но не ускорила)
            loader: 'babel',
            query: {
                presets: ['es2015']
            }
        }]
    },

    noParse: wrapRegexp(/\/node_modules\/(...)/, 'noParse')
};

if(NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    )
}

function wrapRegexp(regexp, label) {
    regexp.test = function(path) {
        console.log(label, path);
        return RegExp.prototype.test.call(this, path);
    };

    return regexp;
}