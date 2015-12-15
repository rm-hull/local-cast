import React from 'react';
import MenuItem from 'material-ui/lib/menu/menu-item';
import PageWithNav from './page-with-nav';

export default class MediaTypes extends React.Component {

  render() {
    let menuItems = [
      {route: '/media/video', text: 'Video'},
      {route: '/media/audio', text: 'Audio'},
      {text: 'Now playing',  type: MenuItem.Types.SUBHEADER},
      {route: '/now-playing/living-room', text: 'Living Room'},
    ];

    return (
      <PageWithNav menuItems={menuItems}>
        {this.props.children}
      </PageWithNav>
    );
  }
}

MediaTypes.propTypes = {
  children: React.PropTypes.node,
};
