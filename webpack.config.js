var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    'index.ios': path.join(__dirname, 'src/index.ios.rb')
  },
  externals: [
    'react',
    /react-native.*/
  ],
  module: {
    loaders: [{
      test: /\.rb$/,
      loader: 'opal-webpack',
      query: {
        cacheDirectory: 'tmp'
      }
    }]
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs'
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true
    })
  ]
};
