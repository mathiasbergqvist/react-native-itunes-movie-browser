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
      <View style={styles.mainContainer}>
        <View style={styles.navbar}>
          <View style={styles.navbarButton}></View>
          <Text style={styles.navbarTitle}>
            iTunesBrowser
          </Text>
          <Text style={styles.navbarButton}>
            Search
          </Text>
        </View>
        <View style={styles.content}>
          <Text>
            Bacon ipsum dolor amet ham hock brisket alcatra, shankle pork chop picanha hamburger. Tongue tail sausage bacon bresaola beef shoulder chicken venison shankle corned beef strip steak. T-bone short ribs sirloin tenderloin, beef tongue pork loin short loin beef ribs shank flank. Ball tip cupim sirloin boudin ribeye brisket flank. Chuck swine flank beef ribs, pastrami ham fatback strip steak landjaeger.
          </Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: '#CCC'
  },
  navbar: {
    backgroundColor: '#2a3744',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#FEFEFE',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 2
  },
  navbarButton: {
    width: 50,
    color: '#FEFEFE',
    textAlign: 'center',
    flex: 1
  }
});

AppRegistry.registerComponent('iTunesBrowser', () => iTunesBrowser);
