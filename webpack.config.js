const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		polyfills: './apps/skills-app/src/polyfills.ts',
		main: './apps/skills-app/src/main.ts',
		styles: './apps/skills-app/src/styles.scss'
	},
	devtool: 'inline-source-map',

	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({
			title: 'Skills App',
			template: path.resolve(__dirname, 'apps/skills-app/src/index.html')
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
					path.resolve(__dirname, 'apps/skills-app'),
					path.resolve(__dirname, 'libs'),
					path.resolve(__dirname, 'typings')
				],
				exclude: [/node_modules/],
				options: {
					transpileOnly: true
				}
			},
			{ test: /\.html$/, loader: "html-loader" },
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'bundle.css',
						},
					},
					{ loader: 'extract-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' },
				]
			}
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

	devServer: {
		open: false,
		historyApiFallback: true
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		plugins: [new TsconfigPathsPlugin()]
	}
};
