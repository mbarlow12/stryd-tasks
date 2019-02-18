import * as fs from 'fs';
import * as path from 'path';
import { queryMatch, parseCommentHtml, parseHtmlForComments } from './HTMLUtils';

const testHaystackSets = [
  new Set( ['true'] ),
  new Set( 'this is true'.split( ' ' ) )
];

it( 'queryMatch properly finds matching text', () => {
  expect( queryMatch( testHaystackSets[0], 'true' ) ).toEqual( true );
  expect( queryMatch( testHaystackSets[0], ...[ 'also', 'true' ] ) ).toEqual( true );
  expect( queryMatch( testHaystackSets[1], 'is' ) ).toEqual( true );
  expect( queryMatch( testHaystackSets[1], ...[ 'is', 'boom' ] ) ).toEqual( true );
} );

it( 'queryMatch properly does not find nonmatch text', () => {
  expect( queryMatch( testHaystackSets[0], 'false' ) ).toEqual( false );
  expect( queryMatch( testHaystackSets[0], ...[ 'also', 'no' ] ) ).toEqual( false );
  expect( queryMatch( testHaystackSets[1], 'not' ) ).toEqual( false );
  expect( queryMatch( testHaystackSets[1], ...[ 'no', 'boom' ] ) ).toEqual( false );
} );

const commentDiv = document.createElement( 'div' );

const commentHtml = `<div id="comment-1114022"><div class="comment-author "> <img alt="" src="//www.dcrainmaker.com/images/fv-gravatar-cache/default58.png" data-lazy-src="//www.dcrainmaker.com/images/fv-gravatar-cache/default58.png" data-lazy-srcset="//www.dcrainmaker.com/images/fv-gravatar-cache/mystery116.png 2x" class="avatar avatar-58 photo lazyloaded" srcset="//www.dcrainmaker.com/images/fv-gravatar-cache/mystery116.png 2x" data-was-processed="true" width="58" height="58"><noscript><img alt='' src='//www.dcrainmaker.com/images/fv-gravatar-cache/default58.png' srcset='//www.dcrainmaker.com/images/fv-gravatar-cache/mystery116.png 2x' class='avatar avatar-58 photo' height='58' width='58' /></noscript> <cite class="fn"><a href="http://www.stryd.com" rel="external nofollow" class="url">Jamie (Stryd)</a></cite></div><div class="comment-meta commentmetadata"><a href="https://www.dcrainmaker.com/2015/01/stryd-first-running.html#comment-1114022"> January 30, 2015 at 10:18 pm</a> <span class="commentnumber alignright">#3</span></div><div class="comment-body"><p>We tested running on the treadmill and outdoors. We found that running form and therefore power generation varies between the two. It is kind of neat to be able to see the impact of training outdoors vs. indoors.</p><div class="fv_tc_wrapper"><div class="reply"><a rel="nofollow" class="comment-reply-link" href="#respond" onclick="return addComment.moveForm( &quot;comment-1114022&quot;, &quot;1114022&quot;, &quot;respond&quot;, &quot;42191&quot; )" aria-label="Reply to Jamie (Stryd)">Reply</a></div></div></div><div class="reply"></div></div>`;

commentDiv.innerHTML = commentHtml;

it( 'parseCommentHtml returns a single comment', done => {
  parseCommentHtml( commentDiv ).then( data => {
    expect( data.tokens ).toBeDefined();
    expect( data.tokens.size ).toBeGreaterThan( 0 );
    expect( data.rawContent ).toEqual( 'We tested running on the treadmill and outdoors. We found that running form and therefore power generation varies between the two. It is kind of neat to be able to see the impact of training outdoors vs. indoors.' );
    done();
  } );
} );

const html: string = fs.readFileSync( path.resolve( __dirname, 'test.html' ), { encoding: 'utf8'} );
const fullHtmldoc = ( new DOMParser() ).parseFromString( html, 'text/html' );
it( 'parseHtmlForComments should return a list of comments', done => {
  parseHtmlForComments( fullHtmldoc ).then( ( commentArray: CommentData[] ) => {
    expect( commentArray ).not.toBeNull();
    expect( commentArray ).not.toBeUndefined();
    expect( commentArray.length ).toEqual( 272 );

    const authors = commentArray.map( c => {
      expect( c.author ).not.toBeNull();
      expect( c.author ).not.toMatch( /<a/ );
      return c.author;
    } );
    expect( authors.length ).toEqual( 272 );

    const links: string[] = commentArray.map( c => {
      expect( c.link ).not.toBeNull();
      expect( c.link ).toMatch( /https/ );
      return c.links;
    } );
    expect( links.length ).toEqual( 272 );
    done();
  } );
} );

it( 'parseHtmlForComments should reduce its numbers form a single query', done => {
  const query = ['studies'];
  parseHtmlForComments( fullHtmldoc ).then( original => {
    parseHtmlForComments( fullHtmldoc, query ).then( ( commentArray: CommentData[] ) => {
      expect( commentArray.length ).toBeLessThan( 272 );
      expect( commentArray.length ).toEqual( 2 );
      for ( let originalComment of original ) {
        if ( originalComment.tokens.has( ...query ) ) {
          expect( commentArray ).toContainEqual( originalComment );
        }
        else {
          expect( commentArray ).not.toContain( originalComment );
        }
      }
      done();
    } );
  } );
} );

