require 'opal'
require 'react-opal'

%x{
  // needs to be a global so that Opal can find it
  React = require('react');
  var _reactNative = require('react-native');
}

module React
  # TODO: use the native stylesheet helper
  def self.stylesheet(hash)
    hash.to_n
  end
end

class HelloMessage
  include React::Component

  def render
    view_style = React.stylesheet flex: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center'
    present(`_reactNative.View`, style: view_style) {
      text_style = React.stylesheet fontSize: 20,
                                    textAlign: 'center',
                                    margin: 10
      present(`_reactNative.Text`, style: text_style) {
        'Welcome to Opal on iOS!'
      }
    }
  end
end

app_registry = `_reactNative.AppRegistry`
native_klass = React::ComponentFactory.native_component_class HelloMessage
app_registry.JS.registerComponent('react_native_sample', lambda { native_klass })
