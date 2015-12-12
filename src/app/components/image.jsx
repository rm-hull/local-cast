"use strict";

import React from 'react';

export default class Image extends React.Component {



  constructor() {
    super();
    this._handleError = this._handleError.bind(this);

    this.state = {
      error: false
    };
  }

  _handleError() {
    this.setState({error: true});
  }

  render() {
    return this.state.error
      ? <img {...this.props} src={this.props.missing}/>
      : <img {...this.props} src={this.props.src} onError={this._handleError}/>;
  }
}

Image.propyTypes = {
  src: React.PropTypes.string.isRequired,
  missing: React.PropTypes.string
};

Image.defaultProps = {
  missing: "img/missing.png"
};

