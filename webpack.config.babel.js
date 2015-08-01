import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer-core';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const isProd = process.env.NODE_ENV === 'production';
const buildDir = isProd ? 'dist' : 'build';

const config = {
  entry: {
    app: ['./js/app.js'],
    vendors: [
      'backbone',
      'backbone.paginator',
      'fancybox',
      'FileSaver.js',
      'imports?define=>false!imagesloaded',
      'jquery',
      'jszip',
      'underscore',
    ],
  },
  output: {
    path: path.join(__dirname, buildDir),
    filename: `js/[name].js`,
    chunkFilename: `js/[id].js`,
    publicPath: '/flickr/',
  },
  resolve: {
    alias: {
      templates: path.join(__dirname, 'templates'),
      images: path.join(__dirname, 'images'),
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss'),
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          `url?limit=10000&name=images/[name].[ext]`,
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=true',
        ],
      }, {
        test: /\.html$/,
        loader: 'raw',
      },
    ],
  },
  postcss: [autoprefixer],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', `js/vendors.js`),
    new ExtractTextPlugin(`css/site.css`),
    new HtmlWebpackPlugin({
      template: 'htdocs/index.html',
      minify: !isProd ? false : {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
      },
    }),
  ],
};

if (isProd) {
  config.plugins = config.plugins.concat([
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    })
  ]);
} else {
  config.debug = true;
  config.entry.app.unshift('webpack-dev-server/client?http://localhost:8080');
}

export default config;
