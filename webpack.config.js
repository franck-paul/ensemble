const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['./src/scss/main.scss', './src/js/theme-switcher.js'],
  output: {
    filename: 'main.js',
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        // regular css files
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { url: false, sourceMap: true } }],
      },
      {
        // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false, sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  devtool: 'source-map',
  mode: 'none',
};
