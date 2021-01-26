const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizedCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserOptimizePlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {};

  if (isProd) {
    config.minimizer = [
      new OptimizedCssAssetsPlugin(),
      new TerserOptimizePlugin(),
    ];
  }
  return config;
};

const cssLoader = (extraLoader) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true,
      },
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        esModule: true,
        modules: {
          localIdentName: isDev
            ? '[name]__[local]--[hash:base64:5]'
            : '[hash:base64:5]',
        },
      },
    },
  ];

  if (extraLoader) {
    loaders.push(extraLoader);
  }

  return loaders;
};

const babelOptions = (preset) => {
  const options = {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-class-properties'],
  };

  if (preset) {
    options.presets.push(preset);
  }

  return options;
};

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: babelOptions(),
    },
  ];

  return loaders;
};

const plugins = () => {
  const base = [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin(),
  ];

  return base;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['./index.jsx'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: optimization(),
  devServer: {
    historyApiFallback: true,
    port: '4200',
    hot: isDev,
  },
  devtool: isDev ? 'source-map' : '',
  resolve: {
    extensions: ['.js', '.jsx', '.png', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoader(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoader('sass-loader'),
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react'),
        },
      },
    ],
  },
  plugins: plugins(),
};
