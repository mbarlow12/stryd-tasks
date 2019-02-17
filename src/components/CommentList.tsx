import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { CommentData } from '../lib/HTMLUtils';
// import { getRawHtml } from '../lib/DCRainMakerFetch';
// import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
// import withRoot from '../withRoot';
//
// const styles = ( theme: Theme ) => ({
//   root: {
//     flexGrow: 1,
//     maxWidth: 752,
//   },
//   demo: {
//     backgroundColor: theme.palette.background.paper,
//   },
//   title: {
//     margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
//   },
// });

type CommentListProps = {
  comments: CommentData[]|null;
}

function CommentListItem( props:any ) {
  return (
    <ListItem>
      <ListItemText primary={props.author}/>
      <ListItemText primary={props.content}/>
    </ListItem>
  )
}


function renderList( props: CommentListProps ) {
  if ( props.comments === null ) {
    return (
      <ListItem>
        <ListItemText primary="nothing to show" key={1}/>
      </ListItem>
    )
  }
  else {
    return props.comments.map( ( comment, i ) => {
      return <CommentListItem author={comment.author} content={comment.rawContent} key={i}/>
    } );
  }
}

export function CommentList( props: CommentListProps ) {
  return (

    <Grid item xs={12}>
      <Paper>
        <List dense={true}>
          {renderList( props )}
        </List>
      </Paper>
    </Grid>
  );
}

// export default withRoot( withStyles( styles )( CommentList ) );