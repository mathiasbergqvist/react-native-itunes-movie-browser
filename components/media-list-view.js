import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  AlertIOS,
  ActivityIndicatorIOS,
  ListView
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
      resultsData: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 != row2
      })
    };
  },
  componentDidMount: function(){
    this.searchMedia('mission impossible');
  },
  getDataSource: function(mediaItems: Array<any>): ListView.DataSource{
    return this.state.resultsData.cloneWithRows(mediaItems);
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
          resultsData: this.getDataSource(cachedResultsForQuery)
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
          isLoading: false,
          resultsData: this.getDataSource([])
        });
      })
      .then((responseData) => {
        LOADING[query] = false;
        resultsCache.dataForQuery[query] = responseData.results;

        this.setState({
          isLoading: false,
          resultsData: this.getDataSource(resultsCache.dataForQuery[query])
        });
      })
    }
  },
  renderSeparator: function(
    sectionId: number | string,
    rowId: number | string,
    adjacentRowHighlighted: boolean
  ){
    return(
      <View
        key={"SEP_"+sectionId+rowId}
        style={[styles.listView.rowSeparator, adjacentRowHighlighted && styles.listView.rowSeparatorHighlighted]}
        />
    );
  },
  renderRow: function(
    media: Object,
    sectionId: number | string,
    rowId: number | string,
    highlightRowFunction: (sectionId: ?number | string, rowId: ?number | string) => void
  ){
    return(
      <Text>{media.trackName}</Text>
    );
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
          <View style={[styles.listView.rowSeparator, {marginLeft:0}]}/>
          <ListView
            dataSource={this.state.resultsData}
            renderRow={this.renderRow}
            renderSeparator={this.renderSeparator}
            automaticallyAdjustContentInsets={false}
            keyboardDismissMode='on-drag'
            />
        </View>
      );
    }
  });

  module.exports = MediaListView;
