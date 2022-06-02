// webpack will look for this exact filename so it cannot be named anything different

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require("webpack");
const path = require('path');

// main configuration object that tells webpack what to do
module.exports = {
    // root of the bundle and beginning of the dependency graph
    entry: './assets/js/script.js',
    // output bundled code to specified folder
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
            // the report outputs to an HTML file in the dist folder
            analyzerMode: 'static'
        })
    ],
    // specify the mode for webpack to run
    mode: 'development'
};