const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const root = path.resolve(__dirname, '..');

module.exports = {

  entry: {
    polyfills: './apps/skills-app/src/polyfills.ts',
    main: './apps/skills-app/src/main.ts',
    styles: './apps/skills-app/src/styles.scss'
  },

  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(root, 'dist')
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      title: 'Skills App',
      template: path.resolve(root, 'apps/skills-app/src/index.html')
    }),
    new ForkTsCheckerWebpackPlugin({
      tslint: false,
      useTypescriptIncrementalApi: true,
      measureCompilationTime: true,
      compilerOptions: {
        allowJs: false
      }
    })
  ],

  module: {
    rules: [
      {
        test: /.(ts|tsx)?$/,
        loader: 'ts-loader',
        include: [
          path.resolve(root, 'apps/skills-app'),
          path.resolve(root, 'libs'),
          path.resolve(root, 'typings')
        ],
        exclude: [/node_modules/],
        options: {
          transpileOnly: true
        }
      },
      { test: /\.html$/, loader: "html-loader" }
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    },
    runtimeChunk: 'single'

  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
    mainFields: ['es2015', 'browser', 'module', 'main']
  }
};

