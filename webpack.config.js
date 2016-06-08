var path = require('path');
var webpack = require('webpack');

var reactNativeExternalsPromise = (function () {
  var reactNativeRoot = path.dirname(require.resolve('react-native/package'));
  var blacklist = require('react-native/packager/blacklist');
  var ReactPackager = require('react-native/packager/react-packager');
  const rnEntryPoint = require.resolve('react-native');

  return ReactPackager.getDependencies({
    assetRoots: [__dirname],
    blacklistRE: blacklist(false),
    projectRoots: [__dirname],
    transformModulePath: require.resolve('react-native/packager/transformer'),
  }, {
    entryFile: rnEntryPoint,
    dev: true,
    platform: 'ios',
  })
    .then(function (dependencies) {
      return dependencies.filter(function (dependency) {
        return !dependency.isPolyfill;
      });
    })
    .then(function (dependencies) {
      return dependencies.map(function (dependency) {
        return dependency.id;
      });
    });
}());

module.exports = {
  entry: {
    'index.ios': path.join(__dirname, 'src/index.ios')
  },
  externals: [
    function (context, request, cb) {
      reactNativeExternalsPromise.then(function (reactNativeExternals) {
        if (['react-native'].concat(reactNativeExternals).indexOf(request) != -1) {
          cb(null, request);
        } else{
          cb();
        }
      });
    }
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
