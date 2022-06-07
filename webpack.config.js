// webpack will look for this exact filename so it cannot be named anything different

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require("webpack");
const path = require('path');
const WebpackPwaManifest = require("webpack-pwa-manifest");

// main configuration object that tells webpack what to do
module.exports = {
    // root of the bundle and beginning of the dependency graph
    entry: {
        app: './assets/js/script.js',
        events: './assets/js/events.js',
        schedule: './assets/js/schedule.js',
        tickets: './assets/js/tickets.js'
    },
    // output bundled code to specified folder
    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.jpg$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        name (file) {
                          return "[path][name].[ext]"
                        },
                        publicPath: function(url) {
                          return url.replace("../", "/assets/")
                        }
                      }
                },
                {
                    loader: 'image-webpack-loader'
                }
            ]
          }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
            // the report outputs to an HTML file in the dist folder
            analyzerMode: 'static'
        }),
        new WebpackPwaManifest({
            name: 'Food Event',
            short_name: 'Foodies',
            description: 'An app that allows you to view upcoming food events.',
            start_url: '../index.html',
            background_color: '#01579b',
            theme_color: '#ffffff',
            fingerprints: false,
            inject: false,
            icons: [{
                src: path.resolve('assets/img/icons/icon-512x512.png'),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: path.join('assets', 'icons')
            }]
        })
    ],
    // specify the mode for webpack to run
    mode: 'development'
};