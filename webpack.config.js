'use strict';

const NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
    entry: "./home",
    output: {
        filename: "build.js",
        library: "home"
    },

    watch: NODE_ENV == "development",

    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: NODE_ENV == "development" ? "cheap-inline-module-source-map" : null
};