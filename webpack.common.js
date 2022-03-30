const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  plugins: [
    new CopyPlugin([
      { from: 'src/assets/images/your-logo-here.png', to: 'assets/images/your-logo-here.png' },
      { from: 'src/assets/images/your-logo-footer.png', to: 'assets/images/your-logo-footer.png' },
    ]),
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
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
        test: /\.(png|jpg)$/,
        use: [{ loader: 'url-loader' }],
      },
    ],
  },
};
