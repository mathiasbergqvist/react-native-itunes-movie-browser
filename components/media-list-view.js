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

var MediaCell = require('./media-cell');
var MediaDetailedView = require('./media-detailed-view');

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
    this.searchMedia('star wars');
  },
  getDataSource: function(mediaItems: Array<any>): ListView.DataSource{
    return this.state.resultsData.cloneWithRows(mediaItems);
  },
  _urlForQuery: function(query: string): string{
    if(query.length > 2){
      return API_URL + '?media=movie&term=' + encodeURIComponent(query);
    }
    else{
      API_URL + '?media=movie&term=star+wars';
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
        return responseData.results.filter((e) => e.wrapperType !== 'collection');
      })
      .then((responseData) => {
        LOADING[query] = false;
        resultsCache.dataForQuery[query] = responseData;

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
      <MediaCell
        media={media}
        onSelect={() => this.selectMediaItem(media)}
        onHighlight={() => highlightRowFunction(sectionId, rowId)}
        onDeHighlight={() => highlightRowFunction(null, null)}
        />
    );
  },
  selectMediaItem: function(mediaItem){
    this.props.navigator.push({
      title: 'Media Details',
      component: MediaDetailedView,
      passProps: {mediaItem}
    });
  },
  render(){
    var content = null;

    if(this.state.resultsData.getRowCount() === 0){

      var text = '';

      if(this.state.isLoading && this.state.query){
        text = "No movies found for '" + this.state.query + "'.";
      }
      else if(!this.state.isLoading){
        text = "No movies found.";
      }

      content = <View style={styles.listView.emptyList}>
        <Text style={styles.listView.emptyListText}>{text}</Text>
      </View>;
    }
    else{
      content = <ListView
        dataSource={this.state.resultsData}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode='on-drag'
        />;
    }
    return(
      <View style={styles.global.content}>
        <SearchBar
          isLoading={this.state.isLoading}
          onSearch={(event) => {
            let searchString = event.nativeEvent.text;
            this.clearTimeout(this.timeoutID);
            this.timeoutID = this.setTimeout(() => this.searchMedia(searchString), 250);
          }}/>
          <View style={[styles.listView.rowSeparator, {marginLeft:0}]} />
          {content}
      </View>
      );
    }
  });

  module.exports = MediaListView;
