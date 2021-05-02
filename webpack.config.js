'use strict';
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
var APP = __dirname + '/app';

module.exports = {
  mode: 'development',
  entry: {
    index: './src/app/app.ts',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './src/public/index.html',
      inject: 'body'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  devtool: 'inline-source-map',

  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx', '.css' ]
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },

  devServer: {
    contentBase: './src/public',
    stats: 'minimal',
    port: 8081,
    proxy: {
      '/rest' : {
        target: 'http://localhost:8080',
        secure: false
      }
    }
  }

}