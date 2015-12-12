"use strict";

import React from 'react';
import Paper from 'material-ui/lib/paper';
import AutoComplete from 'material-ui/lib/auto-complete';
import RaisedButton from 'material-ui/lib/raised-button';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import IconButton from 'material-ui/lib/icon-button';
import { Router, Route, Link } from 'react-router'
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';

import {capitalize, pluralize} from 'inflection';
import request from 'superagent';

import noCache from '../../../utils/no-cache';

const img_prefix = "https://image.tmdb.org/t/p/w185"


export default class Search extends React.Component {

  constructor() {
    super();
    this._onSearch = this._onSearch.bind(this);
    this.state = {
      results: [],
      error: null
    }
  }

  _onSearch(event) {
    event.preventDefault();
    const searchTerms = this.refs.autocomplete.getValue();

    request
      .get("search")
      .query({terms: searchTerms})
      .use(noCache)
      .end((err, res) => {
        if (err) {
          this.setState({
            results: [],
            error: err
          });
        } else {
          this.setState({
            results: res.body,
            error: null
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
          hintText={`${capitalize(this.props.type)} keywords`}
          dataSource={["The Grand Budapest Hotel", "Jean de Florette", "Interstellar"]} />

        <RaisedButton label="Search" onTouchTap={this._onSearch}/>

        <GridList
          cellHeight={278}
          cols={3}
          style={{height: 640, overflowY: 'auto'}} >
          {
            this.state.results.map((media, index) => {
              let metadata = media.metadata || media.matches[0];
              return (
                <GridTile
                  key={index}
                  style={{cursor: "pointer"}}
                  title={metadata.title}
                  actionIcon={media.matches ? <IconButton><StarBorder color="white"/></IconButton> : false}
                  subtitle={metadata.release_date.slice(0, 4)}>
                  <Link to={`/media/${this.props.type}/${media.id}`}>
                    <img
                      onError={() => this.src = "img/missing.png"}
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
