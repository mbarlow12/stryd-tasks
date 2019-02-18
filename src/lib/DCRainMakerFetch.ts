/**
 * Reaches out to the given url to fetch the html from the response body. It's important
 * to note that for this setup, we've proxied the development server to point to
 * https://www.dcrainmaker.com. Thus, requests to '/' will be forwarded on to that domain.
 * This was done to handle the CORS errors while trying to fetch from another domain.
 *
 * @param  url - the root-relative path to request
 * @return {Promise<string>}  a promise that resolves to the raw html from the response body
 */
export async function getRawHtml( url: RequestInfo ): Promise<string> {
  return fetch( url ).then( res => {
    if ( !res.ok ) {
      throw new Error( 'there was a problem with the response' );
    }
    return res.text();
  } );
}