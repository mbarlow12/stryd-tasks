
/**
 * Extracts a set of unique words from the given text string. NOTE: will match single
 * letters or word portions if separated by non-word characters
 * (e.g. he's -> [he, s], non-existent -> [non, existent])
 * @param   text
 * @return  {Promise<Set<string>>}
 */
async function extractWordTokens( text: string ): Promise<Set<string>> {
  return new Set( text.match( /\w+/g ) );
}

/**
 * Attempts to convert common transactions into their complete word counterparts.
 * (e.g. couldn't -> [could, not])
 * @param  text
 * @return  <Promise<string>>
 */
async function expandContractions( text: string ): Promise<string> {
  return text.replace( /n('|\u2019)t/gi, ' not' )
             .replace( /('|\u2019')ve/gi, '' );  // shouldn't've
}

/**
 * Removes html tags from  the given string to aid in the following parsing
 * steps. Fairly naive approach as it simply removes any matched tokens starting
 * and ending with < and >, respectively.
 * @param  rawHtml
 * @return  {Promise<string>}
 */
export async function stripHtml( rawHtml: string ): Promise<string> {
  return rawHtml.replace( /(<([^>]+)>)/ig, '' );
}

/**
 * Combines the parsing functions into an asynchronous pipeline to transform raw
 * html into a set of unique tokens for searching.
 * @param  rawHtml
 * @return {Promise<Set<string>>}
 */
export async function htmlToTokenArray( rawHtml: string ): Promise<Set<string>> {
  return stripHtml( rawHtml )
    .then( expandContractions )
    .then( extractWordTokens );
}