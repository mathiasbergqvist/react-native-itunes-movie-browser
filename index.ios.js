import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  StatusBarIOS,
  NavigatorIOS,
  AlertIOS
} from 'react-native';

var styles = require('./style');
var MediaListView = require('./components/media-list-view');
StatusBarIOS.setStyle('light-content');

class iTunesBrowser extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.global.mainContainer}
        barTintColor='#2A3744'
        tintColor='#EFEFEF'
        titleTextColor='#EFEFEF'
        initialRoute={{
          component: MediaListView,
          title: 'iTunesBrowser',
          rightButtonTitle: 'Search',
          onRightButtonPress: () => AlertIOS.alert(
            'Search', 'You pressed the serach button'
          )
        }}
        />
    );
  }
}

AppRegistry.registerComponent('iTunesBrowser', () => iTunesBrowser);
