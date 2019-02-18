import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Grid from '@material-ui/core/Grid';
import { CommentData } from '../lib/HTMLUtils';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withRoot from '../withRoot';
import { Theme, createStyles } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';

const styles = ( theme: Theme ) => createStyles( {
  root: {
    flexGrow: 1
  },
  demo: {
    marginTop: theme.spacing.unit
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
  list: {
    width: '100%',
    maxWidth: theme.spacing.unit * 100,
    margin: '0 auto'
  }
} );

/*
 * Interface for the props passed to the component. Allows for valid types when
 * applying the styles (see https://material-ui.com/guides/typescript/)
 */
interface CommentListProps extends WithStyles<typeof styles>{
  comments: CommentData[]|null;
}


/**
 * List item component for rendering the sentiment icon, author, and contents.
 *
 * @param  props
 * @return {JSX.Element}
 */
function CommentListItem( props:any ): JSX.Element {
  let icon = (<ThumbsUpDownIcon />);
  if ( props.sentiment > 0.45 ) {
    icon = (<ThumbUpIcon />);
  }
  else if ( props.sentiment < -0.25 ) {
    icon = (<ThumbDownIcon />);
  }
  return (
    <ListItem className={props.class}>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={props.author} secondary={props.content}/>
    </ListItem>
  )
}

/**
 * Helper function to programmatically render the returned comment data.
 *
 * @param  props
 * @return {JSX.Element|JSX.Element[]}
 */
function renderList( props: CommentListProps ): JSX.Element|JSX.Element[] {
  if ( props.comments === null ) {
    return (
      <ListItem>
        <ListItemText primary="nothing to show" key={1}/>
      </ListItem>
    )
  }
  else {
    return props.comments.map( ( comment, i ) => {
      return <CommentListItem author={comment.author} content={comment.rawContent} key={i} sentiment={comment.sentiment} class={props.classes.demo}/>
    } );
  }
}

/**
 * Class to handle the rendering of the entire returned comment list.
 * This is technically a pure functional component, but proper configuration with
 * typescript requires a class.
 *
 * @param props [description]
 */
class CommentList extends React.Component<CommentListProps> {

  constructor( props: CommentListProps ) {
    super( props );
  }

  render() {
    return (
      <Grid item xs={12} className={this.props.classes.root}>
          <List className={this.props.classes.list}>
            {renderList( this.props )}
          </List>
      </Grid>
    );
  }
}

export default withRoot( withStyles( styles )( CommentList ) );