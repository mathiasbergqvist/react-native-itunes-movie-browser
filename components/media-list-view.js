import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  AlertIOS,
  ActivityIndicatorIOS
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
        <ActivityIndicatorIOS
          animating={this.props.isLoading}
          style={styles.listView.spinner}
          />
      </View>
    );
  }
}
var MediaListView = React.createClass({
  mixins: [TimerMixin],
  timeoutID: null,
  getInitialState: function (){
    return{
      isLoading: false,
      query: '',
      resultsData: []
    };
  },
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
    this.setState({query: query});
    let cachedResultsForQuery = resultsCache.dataForQuery[query];
    if(cachedResultsForQuery) {
      if (!LOADING[query]) {
        this.setState({
          isLoading: false,
          resultsData: cachedResultsForQuery
        });
      }
      else{
        this.setState({
          isLoading: true
        });
      }
    }
    else{
      let queryURL = this._urlForQuery(query);

      if(!queryURL) return;

      this.setState({
        isLoading: true
      });

      LOADING[query] = true;
      resultsCache.dataForQuery[query] = null;
      fetch(queryURL)
      .then((response) => response.json())
      .catch((error) => {
        LOADING[query] = false;
        resultsCache.dataForQuery[query] = undefined;

        this.setState({
          isLoading: false
        });
      })
      .then((responseData) => {
        LOADING[query] = false;
        resultsCache.dataForQuery[query] = responseData.results;

        this.setState({
          isLoading: false,
          resultsData: resultsCache.dataForQuery[query]
        });
      })
    }
  },
  render(){
    return(
      <View style={styles.global.content}>
        <SearchBar
          isLoading={this.state.isLoading}
          onSearch={(event) => {
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
