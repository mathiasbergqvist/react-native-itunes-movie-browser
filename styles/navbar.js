'use strict';

var React = require('react-native');
var {
  StyleSheet
} = React;

module.exports = StyleSheet.create({
  apperence: {
    backgroundColor: '#2a3744',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  title: {
    color: '#FEFEFE',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 2
  },
  button: {
    width: 50,
    color: '#FEFEFE',
    textAlign: 'center',
    flex: 1
  },
});
