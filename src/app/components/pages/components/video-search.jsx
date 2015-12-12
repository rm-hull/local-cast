import React from 'react';
import Search from './search';

export default class VideoSearchPage extends React.Component {

  render() {
    return (
      <Search type="video" history={this.props.history}/>
    );
  }
}
