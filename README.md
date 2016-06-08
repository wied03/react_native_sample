To get this working

`npm install && bundle install`

In node_modules/react-native/packager/react-packager/src/polyfills/polyfills.js, you need to modify the Object.assign polyfill

Changed line 56

```js

    for (var key in nextSource) {
      if (__DEV__) {
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        if (!hasOwnProperty.call(nextSource, key) && key.indexOf('$') == -1) {
          throw new TypeError(
            'One of the sources for assign has an enumerable key on the ' +
            'prototype chain. This is an edge case that we do not support. ' +
            'This error is a performance optimization and not spec compliant.'
          );
        }
      }
      target[key] = nextSource[key];
    }
```

TODO:
* Rather than commenting out the entire clause above, probably need to monkey patch it with an exclusion on
all Opal prototypes. Couldn't easily do this in testing though

Fire off webpack watch with
```
bundle exec ./node_modules/.bin/webpack --watch &
```

Then run with `react-native run-ios`