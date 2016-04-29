'use strict';
// ## Webpack Configuration
// This file is used for both testing under
// [karma-webpack](https://github.com/webpack/karma-webpack)
// and [gulp-webpack](https://github.com/shama/gulp-webpack).
//
//var path = require('path');
/*
webpack-dev-server 會在 localhost:8080 建立起專案的 server
--devtool eval 會顯示出發生錯誤的行數與檔案名稱
--progress 會顯示出打包的過程
--colors 會幫 webpack 顯示的訊息加入顏色
--content-based build 指向專案最終輸出的資料夾

*/
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  cache: true,
  // ### Output
  // karma-webpack will specify the output path when testing. This
  // setting is used for building.
  alias: {
    'react' : path.join(__dirname, 'node_modules', 'react')
  },
  entry: "./js/app.js",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
    },

  module: {
      loaders: [
            //load bootstrap https://github.com/bline/bootstrap-webpack-example/blob/master/webpack.config.js
            // another options? bootstrap api https://react-bootstrap.github.io/introduction.html
            {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },

      			//{ test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
      			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
            { test: /\.gif$/, loader: "url?limit=10000?mimetype=image/gif" },
            //bootstrap
            , {
              test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
              loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
              test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
              loader: "url?limit=10000&mimetype=application/font-woff"
            },
            { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader',
            query: {

            presets: ['es2015', 'react', 'stage-0']

            }}
      ],
    },
    plugins: [
        new ExtractTextPlugin('public/style.css', {
            allChunks: true
        })
        ,
        new BrowserSyncPlugin({
             // browse to http://localhost:3000/ during development,
             // ./public directory is being served
             host: 'localhost',
             port: 3000,
              proxy: 'http://0.0.0.0:8089/'
           }, {
          reload: false
        })
    ]
};
