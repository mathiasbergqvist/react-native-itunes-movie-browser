'use strict';

import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var styles = require('../style').detailView;

var MediaDetailedView = React.createClass({
  render(){
    var item = this.props.mediaItem;

    var buyPrice = (item.trackHdPrice && item.trackPrice) ?
    <View style={styles.mediaPriceRow}>
      <Text style={styles.sectionTitle}>Buy</Text>
      <Text style={styles.mediaPrice}>${item.trackHdPrice} (HD)</Text>
      <Text style={styles.mediaPrice}>${item.trackPrice} (SD)</Text>
    </View> : null;

    return(
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.mediaTitle} numberOfLines={2}>
          {item.trackName}
        </Text>
        <View style={styles.mainSection}>
          <Image
            source={{uri: item.artworkUrl100}}
            style={styles.mediaImage}
            />
        <View style={{flex: 1}}>
          <Text style={styles.mediaGenre}>{item.primaryGenreName}</Text>
          <Text style={styles.contentAdvisory}>{item.contentAdvisoryRating}</Text>
        </View>
        <View style={styles.separator}/>
        {buyPrice}
      </View>
      <View style={styles.separator}/>
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.mediaDescription}>{item.longDescription}</Text>
    </ScrollView>
  );
}
});

module.exports = MediaDetailedView;
