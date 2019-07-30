const merge = require('webpack-merge');

const defaultConfig = require('./webpack.config.common');

module.exports = merge(defaultConfig, {
	mode: 'development',
	devtool: 'inline-source-map',

	module: {
		rules: [
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

	devServer: {
		open: false,
		historyApiFallback: true
	}
});
