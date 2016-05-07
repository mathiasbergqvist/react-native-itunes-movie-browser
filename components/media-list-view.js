import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  AlertIOS
} from 'react-native';

var styles = require('../style');

class SearchBar extends Component {
  render(){
    return(
      <View style={styles.listView.searchBar}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search for media on iTunes..."
          returnKeyType="search"
          enablesReturnKeyAutomatically={true}
          style={styles.listView.searchBarInput}
          onEndEditing={this.props.onSearch}
        />
      </View>
    );
  }
}

class MediaListView extends Component {
  render(){
    return(
      <View style={styles.global.content}>
        <SearchBar onSearch={(event) => {
            let searchString = event.nativeEvent.text;
            AlertIOS.alert('Searching for...', searchString);
          }}/>
        <Text>
          Bacon ipsum dolor amet ham hock brisket alcatra, shankle pork chop picanha hamburger. Tongue tail sausage bacon bresaola beef shoulder chicken venison shankle corned beef strip steak. T-bone short ribs sirloin tenderloin, beef tongue pork loin short loin beef ribs shank flank. Ball tip cupim sirloin boudin ribeye brisket flank. Chuck swine flank beef ribs, pastrami ham fatback strip steak landjaeger.
        </Text>
      </View>
    );
  }
}

module.exports = MediaListView;
