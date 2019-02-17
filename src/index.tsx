import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import Index from './pages/index';
// import { SearchInput } from './components/index';
import  { SearchApp } from './components/index';
// import { getRawHtml } from './components/DCRainMakerFetch';

ReactDOM.render(<SearchApp />, document.querySelector('#root'));



// fetch( `2015/01/stryd-first-running.html`, {
//   method: 'GET',
//   mode: 'no-cors'
// } )
//   .then( res => {
//     if ( res.ok ) {
//       return res.text();
//     }
//     throw new Error( 'network response was not ok' );
//   } )
//   .then( textContent => {
//     const el = document.createElement( 'html' );
//     el.innerHTML = textContent;
//     return el;
//   } )
//   .then( element => {
//     const comments = element.querySelectorAll( `div[id^=comment-]` );
//     console.log( 'Comments Retrieved: ', comments.length );
//   } )
//   .catch( err => {
//     // handle bad response
//     console.log( 'Error:', err.message );
//
//     // notify user that the response was bad
//   } );