import React from 'react';
import request from 'superagent';

import noCache from '../../../utils/no-cache';

export default class AssetPage extends React.Component {

  constructor() {
    super();
    this._fetchAsset = this._fetchAsset.bind(this);
    this.state = {
      asset: null,
      error: null
    }
  }

  componentDidMount() {
    console.log("componentDidMount >> assetId:" + this.props.params.assetId);
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
      .query({id: id})
      .use(noCache)
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
    return (
      <div>
        <p>AssetId: {this.props.params.assetId}</p>
        <p>Error: {this.state.error}</p>
      </div>
    );
  }
}
