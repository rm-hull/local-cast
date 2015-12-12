"use strict";

import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';

import Image from '../image';

import request from 'superagent';

import noCache from '../../utils/no-cache';
const img_prefix = "https://image.tmdb.org/t/p/w780"

export default class AssetPage extends React.Component {

  constructor() {
    super();
    this._fetchAsset = this._fetchAsset.bind(this);
    this.state = {
      asset: {},
      error: null
    }
  }

  componentDidMount() {
    this._fetchAsset(this.props.params.assetId)
  }

  componentDidUpdate(prevProps) {
    let oldId = prevProps.params.assetId
    let newId = this.props.params.assetId
    if (newId !== oldId)
      this._fetchAsset(this.props.params.assetId)
  }

  _fetchAsset(id) {
    request
      .get("asset")
      .use(noCache)
      .query({id: id})
      .end((err, res) => {

        if (err) {
          this.setState({
            asset: null,
            error: err
          });
        } else {
          this.setState({
            asset: res.body,
            error: null
          });
        }
      });
  }

  render() {
    if (!this.state.asset.id) {
      return false;
    }

    let metadata = this.state.asset.metadata || this.state.asset.matches[0];
    return (
      <Card>
        <CardMedia
          overlay={<CardTitle
                     title={<strong>{metadata.title}</strong>}
                     subtitle={metadata.release_date.slice(0, 4)}/>}>
          <Image
            src={img_prefix + metadata.backdrop_path}
            missing="http://lorempixel.com/g/780/439/abstract/"/>
        </CardMedia>
        <CardActions>
          <span>Cast to</span>
          <FlatButton label="Living Room"/>
          <FlatButton label="Office"/>
        </CardActions>
        <CardText>{metadata.overview}</CardText>
      </Card>
    );
  }
}
