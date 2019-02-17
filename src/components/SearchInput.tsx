import * as React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { SEARCH_FIELD_NAME } from './Constants';
// import { Theme } from '@material-ui/core/styles/createMuiTheme';
// import createStyles from '@material-ui/core/styles/createStyles';
// import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
// import withRoot from '../withRoot';

// const styles = (theme: Theme) =>
//   createStyles({
//     root: {
//       textAlign: 'center',
//       paddingTop: theme.spacing.unit * 20
//     },
//     paper: {
//       padding: theme.spacing.unit * 3,
//     }
//   });

// type State = {
//   isSearching: boolean;
//   name: string;
//   [ key: string ]: string|boolean;
// };

type SearchInputProps = {
  submitQuery: ( arg?: any ) => void;
  handleQueryTextChanged: ( arg: any ) => void;
  commentCount: number;
}

export function SearchInput( props: SearchInputProps ) {

  // state = {
  //   isSearching: false,
  //   name: 'some cool text'
  // }

  // handleChange = ( key: string) => ( e: ChangeEvent )  => {
  //   this.setState( { [key]: (e.target as HTMLInputElement).value } );
  // };

    return (
      <Grid item xs={12}>
      <Paper>
        <form onSubmit={props.submitQuery}>
          <TextField id="search" onChange={props.handleQueryTextChanged} type="text" placeholder="enter search" variant="outlined"/>
          <Button type='submit' variant="contained" color="secondary">Search</Button>
        </form>
        <p>Total Comments: {props.commentCount}</p>
      </Paper>
      </Grid>
    );
}

// export default withRoot( withStyles( styles )( SearchInput ) );