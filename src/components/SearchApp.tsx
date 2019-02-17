import React, { Component } from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { parseHtmlForComments, CommentData } from '../lib/HTMLUtils';
import { getRawHtml } from '../lib/DCRainMakerFetch';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withRoot from '../withRoot';
import {SearchInput} from './SearchInput';
import {CommentList} from './CommentList';
import Grid from '@material-ui/core/Grid';
import { SEARCH_FIELD_NAME } from './Constants';

type AppState = {
  comments: CommentData[]|null;
  query: string[];
  [key: string]: CommentData[]|string[]|null;
}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export class SearchApp extends Component {
  state: AppState = {
    comments: null,
    query: [ 'enter search text' ]
  }

  render() {
    return (
      <Grid container={true} spacing={24} justify='center'>
        <Grid container item xs={12} sm={10} md={8} lg={8}>
          <SearchInput
            commentCount={this.state.comments ? this.state.comments.length : 0}
            submitQuery={e => this.handleQuerySubmission(e)}
            handleQueryTextChanged={ e => this.updateQuery( e ) }/>
          <CommentList comments={this.state.comments}/>
        </Grid>
      </Grid>
    );
  }

  updateQuery( e: React.ChangeEvent<HTMLInputElement> ) {
    let q: string|string[]|null = null;
    const val = e.target.value;
    if ( val.length > 0 ) {
      q = [ e.target.value ];
      if ( val.indexOf( ',' ) !== -1 ) {
        q = val.split( ',' );
      }
    }
    this.setState( { query: q } );
  }

  handleQuerySubmission( event: React.FormEvent<HTMLElement> ): void {
    event.preventDefault();
    getRawHtml( `2015/01/stryd-first-running.html` )
      .then( htmlText => {
        const parser = new DOMParser();
        const doc = parser.parseFromString( htmlText, 'text/html' );
        return doc;
      } )
      .then( htmlDocument => {
        if ( this.state.query ) {
          return parseHtmlForComments( htmlDocument, this.state.query );
        }
        else {
          return parseHtmlForComments( htmlDocument );
        }
      } )
      .then( commentData => {
        this.setState( { comments: commentData } );
      } );
  }
}