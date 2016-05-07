import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  AlertIOS
} from 'react-native';
import TimerMixin from 'react-timer-mixin';

var styles = require('../style');
var API_URL = 'https://itunes.apple.com/search';
var LOADING = {};
var resultsCache = {
  dataForQuery: {}
};

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
          onChange={this.props.onSearch}
        />
      </View>
    );
  }
}
var MediaListView = React.createClass({
  mixins: [TimerMixin],
  timeoutID: null,
  _urlForQuery: function(query: string): string{
    if(query.length > 2){
      return API_URL + '?media=movie&term=' + encodeURIComponent(query);
    }
    else{
      API_URL + '?media=movie&term=mission+impossible';
    }
  },
  searchMedia: function(query: string){
    this.timeoutID = null;
    let cachedResultsForQuery = resultsCache.dataForQuery[query];
    if(cachedResultsForQuery) {
      if (!LOADING[query]) {
        AlertIOS.alert('Number of results', cachedResultsForQuery.length + ' cached results');
        return cachedResultsForQuery;
      }
    }
    else{
      let queryURL = this._urlForQuery(query);

      if(!queryURL) return;

      LOADING[query] = true;
      resultsCache.dataForQuery[query] = null;
      fetch(queryURL)
      .then((response) => response.json())
      .catch((error) => {
        LOADING[query] = false;
        resultsCache.dataForQuery[query] = undefined;
      })
      .then((responseData) => {
        LOADING[query] = false;
        resultsCache.dataForQuery[query] = responseData.results;
        AlertIOS.alert('Number of results', responseData.resultCount + ' results');
      })
    }
  },
  render(){
    return(
      <View style={styles.global.content}>
        <SearchBar onSearch={(event) => {
            let searchString = event.nativeEvent.text;
            this.clearTimeout(this.timeoutID);
            this.timeoutID = this.setTimeout(() => this.searchMedia(searchString), 250);
          }}/>
        <Text>
          Bacon ipsum dolor amet ham hock brisket alcatra, shankle pork chop picanha hamburger. Tongue tail sausage bacon bresaola beef shoulder chicken venison shankle corned beef strip steak. T-bone short ribs sirloin tenderloin, beef tongue pork loin short loin beef ribs shank flank. Ball tip cupim sirloin boudin ribeye brisket flank. Chuck swine flank beef ribs, pastrami ham fatback strip steak landjaeger.
        </Text>
      </View>
    );
  }
});

module.exports = MediaListView;
