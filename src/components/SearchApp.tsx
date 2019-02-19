import React, { Component } from 'react';
import { parseHtmlForComments, CommentData, queryMatch } from '../lib/HTMLUtils';
import { getRawHtml } from '../lib/DCRainMakerFetch';
import SearchInput from './SearchInput';
import CommentList from './CommentList';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { createMuiTheme, MuiThemeProvider, WithStyles, withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withRoot from '../withRoot';

const theme = createMuiTheme( {
  palette: {
    primary: {
      main: '#D08A08'
    }
  }
} );

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: 2 * theme.spacing.unit
    },
    title: {
      width: '100%',
      textAlign: 'center'
    }
  } );

type AppState = {
  comments: CommentData[];
  query: string;
  activeQuery: string[];
  searchResults: CommentData[]|null;
}

function validateQuery( q: string ): boolean {
  return q.match( /[^\w,]/g ) === null;
}

class SearchApp extends Component<WithStyles<typeof styles>> {
  state: AppState = {
    comments: [],
    query: '',
    activeQuery: [],
    searchResults: null
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <Grid container={true} spacing={24} justify='center'>
        <Grid container item xs={12} sm={10} md={8} lg={8} className={this.props.classes.root}>
          <Typography component="h2" variant="h2" gutterBottom className={this.props.classes.title}>
            Fetch from DCRainMaker.com
          </Typography>
        <Typography variant="subtitle1" gutterBottom className={this.props.classes.title}>
          https://www.dcrainmaker.com/2015/01/stryd-first-running.html
        </Typography>
          <SearchInput
            resultCount={this.state.searchResults ? this.state.searchResults.length : 0}
            submitQuery={ ( e: React.FormEvent<HTMLFormElement> ) => this.handleQuerySubmission(e) }/>
          <CommentList comments={this.state.searchResults ? this.state.searchResults : this.state.comments }/>
        </Grid>
      </Grid>
      </MuiThemeProvider>
    );
  }

  componentDidMount() {
    getRawHtml( `2015/01/stryd-first-running.html` )
      .then( htmlText => {
        const parser = new DOMParser();
        const doc = parser.parseFromString( htmlText, 'text/html' );
        return doc;
      } )
      .then( htmlDocument => parseHtmlForComments( htmlDocument ) )
      .then( commentData => {
        this.setState( { comments: commentData, searchResults: commentData } );
      } );
  }

  handleQuerySubmission( event: React.FormEvent<HTMLFormElement> ): void {
    event.preventDefault();
    // if we're not currrently filtering, set active and the queriedText
    if ( !validateQuery( this.state.query ) ) {
      // alert user
      alert( 'queries may only contain words and commas (no spaces)' );
      return;
    }
    // const t = event.currentTarget;
    // t.elements
    const raw = event.currentTarget.elements.search.value;
    const query: string[] = raw.length > 0 ? raw.split( ',' ) : [];

    if ( this.state.activeQuery.length === 0) {
      // no searching is taking place, set the activeQuery and render
      this.setState( {
        activeQuery: query,
        searchResults: this.filterComments( query )
      } );
    }
    else {
      // currently querying,
      if ( query.length === 0 ) {
        // search text deleted, remove activeQuery to display all results
        this.setState( {
          activeQuery: [],
          searchResults: null
        } );
      }
      else if ( query !== this.state.activeQuery ) {
        this.setState( {
          activeQuery: query,
          searchResults: this.filterComments( query )
        } );
      }
    }
  }

  filterComments( query: string[] ): CommentData[] {
    return this.state.comments.filter( comment => {
      return queryMatch( comment.tokens, ...query );
    } );
  }
}

export default withRoot( withStyles( styles )( SearchApp ) );