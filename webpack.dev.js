/* eslint-disable */

const common = require('./webpack.common');
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: {
		devtest: path.resolve(__dirname, 'src', 'devtest', 'index.tsx'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'devtest', 'index.html'),
			filename: path.resolve(__dirname, 'dist', 'index.html'),
			chunks: ['devtest'],
		}),
	],
	module: {
		rules: [
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: false,
						},
					},
				],
			},
		],
	},
	devServer: {
		contentBase: [
			path.join(__dirname, 'dist'),
			path.join(__dirname, 'src', 'devtest', 'assets'),
		],
		compress: false,
		port: 1917,
	},
});
