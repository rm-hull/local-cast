
import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import IconButton from 'material-ui/lib/icon-button';
import AutoComplete from 'material-ui/lib/auto-complete';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';

const containerStyle = {
  //  textAlign: 'center',
  //  paddingTop: 200,
};

const menuItems = [
  { route: 'videos', text: 'Videos' },
  { route: 'music',  text: 'Music' }
];

const Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillMount() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500,
    });

    this.setState({muiTheme: newMuiTheme});
  },

  render() {
    return (
      <div style={containerStyle}>
        <AppBar
          title="local-cast"
          iconElementRight={<IconButton iconClassName="muidocs-icon-custom-github" tooltip="GitHub"/>} />

        <div>
          <LeftNav ref="leftNav" menuItems={menuItems} />

          <AutoComplete
            floatingLabelText="search"
            dataSource={["The Grand Budapest Hotel", "Jean de Florette", "Interstellar"]} />
      </div>
      </div>
    );
  },
});

export default Main;
