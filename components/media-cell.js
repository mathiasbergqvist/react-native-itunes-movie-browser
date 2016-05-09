'use strict';

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var styles = StyleSheet.create({
  cellContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 4
  },
  cellImage: {
    height: 80,
    width: 60,
    marginRight: 8,
    resizeMode: 'contain'
  }
});

var MediaCell = React.createClass({
  render(){
    return(
      <View>
        <TouchableHighlight
          onShowUnderlay={this.props.onHighlight}
          onHideUnderLay={this.props.onDeHighlight}
          >
          <View style={styles.cellContainer}>
            <Image
              source={{uri: this.props.media.artworkUrl100}}
              style={styles.cellImage}
              />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
});

module.exports = MediaCell;
