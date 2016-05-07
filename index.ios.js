import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  StatusBarIOS
} from 'react-native';

StatusBarIOS.setStyle('light-content');

class iTunesBrowser extends Component {
  render() {
    return (
      <View style={styles.global.mainContainer}>
        <View style={styles.navbar.apperence}>
          <View style={styles.navbar.button}></View>
          <Text style={[styles.navbar.title, componentStyles.titleItalic]}>
            iTunesBrowser
          </Text>
          <Text style={styles.navbar.button}>
            Search
          </Text>
        </View>
        <View style={styles.global.content}>
          <Text>
            Bacon ipsum dolor amet ham hock brisket alcatra, shankle pork chop picanha hamburger. Tongue tail sausage bacon bresaola beef shoulder chicken venison shankle corned beef strip steak. T-bone short ribs sirloin tenderloin, beef tongue pork loin short loin beef ribs shank flank. Ball tip cupim sirloin boudin ribeye brisket flank. Chuck swine flank beef ribs, pastrami ham fatback strip steak landjaeger.
          </Text>
        </View>
      </View>
    );
  }
}

var styles = require('./style');

var componentStyles = StyleSheet.create({
  titleItalic: {
    fontStyle: 'italic'
  }
});

AppRegistry.registerComponent('iTunesBrowser', () => iTunesBrowser);
