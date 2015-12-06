import React from 'react';
import Paper from 'material-ui/lib/paper';
import AutoComplete from 'material-ui/lib/auto-complete';
import RaisedButton from 'material-ui/lib/raised-button';

const styles = {
  title: {
    cursor: 'pointer',
  },
};

export default class AppBarPage extends React.Component {

  render() {
    return (
      <Paper>
        <div>
          <p>Search for movies by entering some keywords</p>

          <AutoComplete
              floatingLabelText="Movie keywords"
              dataSource={["The Grand Budapest Hotel", "Jean de Florette", "Interstellar"]} />

          <RaisedButton label="Search"/>
        </div>
      </Paper>
    );
  }

  _onTouchTap() {
    alert('onTouchTap triggered on the title component');
  }

}
