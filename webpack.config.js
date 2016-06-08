var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    'index.ios': path.join(__dirname, 'src/index.ios')
  },
  externals: [
    'react',
    /react-native.*/
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      include: /src/,
      query: {
        presets: ['es2015', 'react'],
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
  ],
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'
    ]
  }
};
