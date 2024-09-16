const path = require('path');

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
};