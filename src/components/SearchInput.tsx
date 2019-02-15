import React, { Component, ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withRoot from '../withRoot';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing.unit * 20
    },
    paper: {
      padding: theme.spacing.unit * 3,
    }
  });

type State = {
  isSearching: boolean;
  name: string;
  [ key: string ]: string|boolean;
};

class SearchInput extends Component<WithStyles<typeof styles>, State> {

  state = {
    isSearching: false,
    name: 'some cool text'
  }

  handleChange = ( key: string) => ( e: ChangeEvent )  => {
    this.setState( { [key]: (e.target as HTMLInputElement).value } );
  };

  render() {
    return (
      <Grid container={true} className={this.props.classes.root} spacing={24} justify='center'>
      <Grid item xs={12} md={6}>
      <Paper className={this.props.classes.paper}>
        <TextField id="search" type="text" value={this.state.name} variant="outlined" onChange={this.handleChange('name')}/>
        <Button variant="contained" color="secondary">Search</Button>
      </Paper>
      </Grid>
      </Grid>
    );
  }
}

export default withRoot( withStyles( styles )( SearchInput ) );