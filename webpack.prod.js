/* eslint-disable */

const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
	mode: 'production',
	externals: {
		// ensuring that styled-components is not shipped as part of the pkg bundle
		"styled-components": {
			commonjs: "styled-components",
			commonjs2: "styled-components",
			amd: "styled-components",
		},
	},
});
