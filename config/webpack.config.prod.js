const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')

const defaultConfig = require('./webpack.config.common');

process.env.NODE_ENV = 'production';

module.exports = merge(defaultConfig, {
	mode: 'production',
	devtool: 'source-map',

	plugins: [
		new MiniCssExtractPlugin({
			moduleFilename: ({ name }) => {
				return `${name.replace('/js/', '/css/')}.css`
			},
		}),
		new WorkboxPlugin.GenerateSW({
			// these options encourage the ServiceWorkers to get in there fast
			// and not allow any straggling "old" SWs to hang around
			clientsClaim: true,
			skipWaiting: true
		}),
		new WebpackPwaManifest({
			name: 'My Progressive Web App',
			short_name: 'MyPWA',
			description: 'My awesome Progressive Web App!',
			background_color: '#ffffff',
			crossorigin: 'anonymous', //can be null, use-credentials or anonymous
			icons: [
				// {
				// 	src: path.resolve('../src/assets/icon.png'),
				// 	sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
				// },
				// {
				// 	src: path.resolve('src/assets/large-icon.png'),
				// 	size: '1024x1024' // you can also use the specifications pattern
				// }
			]
		}),
		new BundleAnalyzerPlugin({})
	],

	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{ loader: 'css-loader', options: { sourceMap: true } },
					{ loader: 'sass-loader', options: { sourceMap: true } },
				]
			}
		]
	},
});
