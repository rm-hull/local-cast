import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Paper from 'material-ui/lib/paper';

const styles = {
  title: {
    cursor: 'pointer',
  },
};

export default class AppBarPage extends React.Component {

  constructor(props) {
    super(props);

    this.desc = 'App bars are a collection of components placed as a static ' +
                'header for an application. It is used for navigation, search ' +
                'branding, and actions. An app bar is also referred to as the ' +
                'primary toolbar or action bar for Android.';

  }

  render() {
    return (
      <div>{this.desc}</div>
    );
  }

  _onTouchTap() {
    alert('onTouchTap triggered on the title component');
  }

}
