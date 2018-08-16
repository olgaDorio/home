const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtraneousFileCleanupPlugin = require('webpack-extraneous-file-cleanup-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const dir = "public";

module.exports = {
  entry: {
    bundle: './js/main.js',
    style: './scss/style.scss',
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, dir),
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        })
      },

      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },

      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },

      {
        test: /\.(png|jpg|svg|ttf)$/,
        loader: 'url-loader',
      },
    ]
  },

  devServer: {
    index: 'index.html',
    contentBase: dir,
    noInfo: true,
    overlay: false,
    historyApiFallback: true,
  },

  devtool: '#eval-source-map',

  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, dir)),

    // new HtmlWebpackExcludeAssetsPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './view/index.pug',
      excludeAssets: [/.js/, /.css/],
    }),

    // new ExtraneousFileCleanupPlugin({
    //   extensions: ['.js'],
    //   paths: ['/bundle'],
    // }),

    new ExtractTextPlugin('[name].css')
  ],
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
  ])
} else {
  module.exports.module.rules = (module.exports.module.rules || []).concat([
    {
      enforce: "pre",
      test: /\.(js)$/,
      exclude: /node_modules/,
      loader: "eslint-loader",
      options: {
        formater: require('eslint-friendly-formatter'),
      }
    }
  ]);

  module.exports.plugins = (module.exports.plugins || []).concat([
    new StyleLintPlugin({
      files: ['**/*.scss'],
    }),
  ]);
}
