const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  //devServer: {
  //      contentBase: path.join(__dirname, 'dist'),
  //      port: 9000,
	//			hot: true,
  //  },
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
