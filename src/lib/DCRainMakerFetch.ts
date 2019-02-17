
/**
 * in package.json, we've proxied the dev server to point to the base url of
 * https://www.dcrainmaker.com
 * so all that needs to be done is to fetch the appropriate path e.g.
 * /2015/01/stryd-first-running.html
 */

export async function getRawHtml( url: RequestInfo ): Promise<string> {
  return fetch( url ).then( res => {
    if ( !res.ok ) {
      throw new Error( 'there was a problem with the response' );
    }
    return res.text();
  } );
}