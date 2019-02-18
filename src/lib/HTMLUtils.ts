import { htmlToTokenArray } from './TextUtils';
import * as vader from 'vader-sentiment';

const COMMENT_SELECTOR = `div[id^=comment-]`;
const AUTHOR_SELECTOR = `.comment-author > cite`;
const CONTENT_SELECTOR = `.comment-body > p`;
const LINK_SELECTOR = `.comment-meta > a`;

export type CommentData = {
 tokens: Set<string>;
 rawContent: string;
 author: string|null;
 link: string|null;
 timestamp: Date|null;
 sentiment: Number
}

function extractLinkAndTime( anchor: HTMLAnchorElement ): { link: string, timestamp: Date } {
  const link = anchor.getAttribute( 'href' );
  const timestamp = new Date( anchor.innerHTML.replace( /at /gi, '' ) + ' GMT' );
  return { link: link !== null ? link : '', timestamp };
}

export async function parseCommentHtml( commentDiv: Element ): Promise<CommentData> {
  const contentElements = commentDiv.querySelectorAll( CONTENT_SELECTOR );
  if ( contentElements === null || contentElements.length === 0 ) {
    throw new Error( 'no comment content found' );
  }
  const rawContent = Array.from( contentElements )
                       .map( elem => elem.innerHTML )
                       .join('\n');
  const tokens = await htmlToTokenArray( rawContent.toLowerCase() );
  const sentiment = vader.SentimentIntensityAnalyzer.polarity_scores( Array.from( tokens ).join( ' ' ) );
  const authorElement = commentDiv.querySelector( AUTHOR_SELECTOR );
  let author = 'no author';
  if ( authorElement !== null ) {
    if ( authorElement.childElementCount > 0 ) {
      author = authorElement.children[ 0 ].innerHTML;
    }
    else {
      author = authorElement.innerHTML;
    }
  }

  const linkElement = commentDiv.querySelector( LINK_SELECTOR );
  let timestamp: Date|null = null;
  let link: string|null = null;

  if ( linkElement !== null && linkElement instanceof HTMLAnchorElement ) {
    const linkAndTime = extractLinkAndTime( <HTMLAnchorElement>linkElement );
    link = linkAndTime.link;
    timestamp = linkAndTime.timestamp;
  }

  return { author, tokens, rawContent, link, timestamp, sentiment: sentiment.compound };
}

/**
 * Takes an entire html document and extracts the comment data via query selectors.
 * As such it is very specific to `https://www.dcrainmaker.com/` and its associated
 * classes and ids.
 * @param  element
 * @return {Promise<Array<CommentData>>}
 */

export async function parseHtmlForComments( element: HTMLHtmlElement|Document ): Promise<Array<CommentData>> {
  let resultPromises: Array<Promise<CommentData|null>> = [];
  const comments = element.querySelectorAll( COMMENT_SELECTOR )

  if ( comments.length ) {
    comments.forEach( comment => {
      resultPromises.push( parseCommentHtml( comment ).then( commentData => commentData ) );
    } );
  }
  else {
    throw new Error( 'no comments found' );
  }
  const results: CommentData[] = <CommentData[]>( await Promise.all( resultPromises ) ).filter( commentData => commentData !== null );
  return results;
}

export function queryMatch( haystack: Set<string>, ...needle: string[] ) {
    for ( let test of needle ) {
      if ( haystack.has( test ) ) {
        return true;
      }
    }
    return false;
}