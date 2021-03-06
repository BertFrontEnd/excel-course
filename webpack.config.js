const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

console.log('Is "prod":', isProd);
console.log('Is "dev":', isDev);

const filename = (ext) => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`);

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
    },
  ];

  if (isDev) {
    loaders.push('eslint-loader');
  }

  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),

  mode: 'development',

  entry: {
    filename: ['@babel/polyfill', './index.js'],
  },

  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },
  },

  devtool: isDev ? 'source-map' : false,

  devServer: {
    port: 9000,
    hot: isDev,
  },

  plugins: [
    new CleanWebpackPlugin(),

    new HTMLWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
      /* favicon: 'favicon.ico', */
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/favicon.svg'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/reset.css'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
      ],
    }),

    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
};
