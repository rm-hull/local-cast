"use strict";

import React from 'react';
import Search from '../search';

export default class AudioSearchPage extends React.Component {

  render() {
    return (
      <Search type="audio" history={this.props.history}/>
    );
  }
}
