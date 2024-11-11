const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@mui/material/Autocomplete': '@mui/material/Autocomplete/index.js',
      '@mui/material/InputBase': '@mui/material/InputBase/index.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'), // Path to your HTML template
      // ... other options if needed ...
    }),
  ],
};