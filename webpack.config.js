const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				pathRewrite: { '^/api': '' },
			},
		},
    port: 9000,
	}
});
