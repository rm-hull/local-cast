"use strict";

import React from 'react';
import Paper from 'material-ui/lib/paper';
import AutoComplete from 'material-ui/lib/auto-complete';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import IconButton from 'material-ui/lib/icon-button';
import { Router, Route, Link } from 'react-router'
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';

import {capitalize, pluralize} from 'inflection';
import request from 'superagent';

import noCache from '../utils/no-cache';
import Image from './image';

const img_prefix = "https://image.tmdb.org/t/p/w185"


export default class Search extends React.Component {

  constructor() {
    super();
    this._onSearch = this._onSearch.bind(this);
    this._onAutoComplete = this._onAutoComplete.bind(this);
    this.state = {
      autoComplete: {
        dataSource: [],
        error: null
      },
      search: {
        results: [],
        error: null
      }
    }
  }

  _onSearch(event) {
    event.preventDefault();
    const searchTerms = this.refs.autocomplete.getValue();

    request
      .get("search")
      .use(noCache)
      .query({terms: searchTerms, type: this.props.type})
      .end((err, res) => {
        if (err) {
          this.setState({
            search: {
              results: [],
              error: `${err.status}: ${err.message}`
            }
          });
        } else {
          this.setState({
            search: {
              results: res.body,
              error: null
            }
          });
        }
      });
  }

  _onAutoComplete(text) {

    request
      .get("suggest")
      .use(noCache)
      .query({text: text})
      .end((err, res) => {
        if (err) {
          this.setState({
            autoComplete: {
              dataSource: [],
              error: `${err.status}: ${err.message}`
            }
          });
        } else {
          this.setState({
            autoComplete: {
              dataSource: res.body,
              error: null
            }
          });
        }
      });
  }

  render() {
    return (
      <Paper style={{padding: 10}}>
        <p>Search for {pluralize(this.props.type)} by entering some keywords</p>

        <AutoComplete
          ref="autocomplete"
          filter={(searchText, key) => key.toLowerCase().includes(searchText.toLowerCase())}
          hintText={`${capitalize(this.props.type)} keywords`}
          dataSource={this.state.autoComplete.dataSource}
          errorText={this.state.autoComplete.error}
          onUpdateInput={this._onAutoComplete}/>

        <FlatButton label="Search" onTouchTap={this._onSearch}/>

        <GridList
          cellHeight={300}
          cols={4}
          style={{height: 640, overflowY: 'auto'}} >
          {
            this.state.search.results.map((media, index) => {
              let metadata = media.metadata || media.matches[0];
              return (
                <GridTile
                  key={index}
                  style={{cursor: "pointer"}}
                  title={<strong>{metadata.title}</strong>}
                  actionIcon={media.matches ? <IconButton><StarBorder color="white"/></IconButton> : <noscript/>}
                  subtitle={metadata.release_date.slice(0, 4)}
                  titleBackground="rgba(0, 0, 0, 0.54)">
                  <Link to={`/media/${this.props.type}/${media.id}`}>
                    <Image
                      style={{width: '100%'}}
                      src={img_prefix + metadata.poster_path} />
                  </Link>
                </GridTile>
              );
            })
          }
        </GridList>
      </Paper>
    );
  }
}
