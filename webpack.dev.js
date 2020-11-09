/* eslint-disable */

const common = require('./webpack.common');
const path = require('path');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
});
