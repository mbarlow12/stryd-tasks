import * as React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withRoot from '../withRoot';
import Chip from '@material-ui/core/Chip';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing.unit * 5,
      margin: '0 auto'
    },
    paper: {
      padding: theme.spacing.unit * 3,
    },
    form: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: theme.spacing.unit
    },
    button: {
      marginLeft: theme.spacing.unit * 2,
    },
    chip: {
      margin: theme.spacing.unit
    }
  } );

interface SearchInputProps extends WithStyles<typeof styles>{
  submitQuery: ( arg?: any ) => void;
  resultCount: Number;
}

class SearchInput extends React.Component<SearchInputProps>  {
  render() {
    return (
      <Grid item xs={12} className={this.props.classes.root}>
      <Paper className={this.props.classes.paper}>
        <form onSubmit={this.props.submitQuery} className={this.props.classes.form}>
          <TextField
            id="search"
            type="text"
            placeholder="enter search"
            variant="outlined"/>
          <Button className={this.props.classes.button} type='submit' variant="contained" color="secondary">Search</Button>
          <Chip label={`${this.props.resultCount} results`} className={this.props.classes.chip}/>
        </form>
      </Paper>
      </Grid>
    );
  }
}

export default withRoot( withStyles( styles )( SearchInput ) );