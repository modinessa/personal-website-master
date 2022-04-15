const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); 


module.exports = {
  entry: {
    app: './src/index.js',
  },
	output: {
    filename: '[name].bundle.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin([
      { from: 'src/assets/images', to: 'assets/images' },
      
    ]),
    new HtmlWebpackPlugin({
			template: 'src/index.html',
			title: 'Production',
			minify: {
      	removeComments: true,
      	collapseWhitespace: true
    }	
		}),
  ],
	optimization: {
      minimizer: [new UglifyJsPlugin()],
    	splitChunks: {
      	chunks(chunk) {
        // exclude `my-excluded-chunk`
        return chunk.name !== 'my-excluded-chunk';
      },
    },

  },
	performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
},
	devtool: false,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.(png|jpg|svg|ico)$/,
        use: [{ loader: 'url-loader' }],
      },
    ],
  },
};
