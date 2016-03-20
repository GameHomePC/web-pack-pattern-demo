'use strict';

const NODE_ENV = process.env.NODE_ENV || "development";
const webpack = require("webpack");
const config = require("./config-path.json");

module.exports = {
    context: __dirname + "/frontend",
    entry: {
        app: "./app"
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
        new webpack.NoErrorsPlugin()
    ],

    /* устанавливает настройки по умолчанию для webpack */
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },

    /* устанавливает настройки по умолчанию для webpack loader */
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: '/',
            loader: 'babel',
            query: {
                compact: false,
                presets: ['es2015']
            }
        }]
    }
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