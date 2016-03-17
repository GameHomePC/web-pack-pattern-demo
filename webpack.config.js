'use strict';

const NODE_ENV = process.env.NODE_ENV || "development";
const webpack = require("webpack");
const config = require("./config-path.json");

module.exports = {
    context: __dirname + "/frontend",
    entry: config.path,

    output: {
        path: __dirname + '/public',
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
        /* передаёт данные в среду frontend */
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            USERDOMAIN: JSON.stringify(process.env.USERDOMAIN)
        }),
        /* создаёт отдельный скрипт common.js */
        new webpack.optimize.CommonsChunkPlugin({
            name: "common"
        })
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
            loader: 'babel?presets[]=es2015'
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