## Fetching from DC RainMaker
A very basic ui around grabbing html from a dedicated url (https://www.dcrainmaker.com/2015/01/stryd-first-running.html) and displaying the comments from the blog post.

It uses Typescript/React/MaterialUI for all the components and tries to perform tasks asynchronously.

For sentiment analysis of the comments we use a js port of the VADER sentiment analysis tool. This uses a comprehensive list of numerically labeled words to attribute a score to the words in a given phrase. After some additional biasing and adjustments (e.g. adding/subtracting value for '!!!' or `not [token]` or `:)`), the scores are normalized between -1 and 1.

Source:

> Hutto, C.J. & Gilbert, E.E. (2014). VADER: A Parsimonious Rule-based Model for Sentiment Analysis of Social Media Text. Eighth International Conference on Weblogs and Social Media (ICWSM-14). Ann Arbor, MI, June 2014.


## To use

Install it and run:

```sh
npm install
npm run start
```
or

```sh
yarn start
```