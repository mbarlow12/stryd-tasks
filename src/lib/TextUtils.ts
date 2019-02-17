
async function extractWordTokens( text: string ): Promise<Set<string>> {
  return new Set( text.match( /\w+/g ) );
}

async function expandContractions( text: string ): Promise<string> {
  return text.replace( /n('|\u2019)t/gi, ' not' )
             .replace( /('|\u2019')ve/gi, '' );  // shouldn't've
}

export async function stripHtml( rawHtml: string ): Promise<string> {
  return rawHtml.replace( /(<([^>]+)>)/ig, '' );
}

export async function htmlToTokenArray( rawHtml: string ): Promise<Set<string>> {
  return stripHtml( rawHtml )
    .then( expandContractions )
    .then( extractWordTokens );
}

// strip html -> expand contractions -> extractTokens