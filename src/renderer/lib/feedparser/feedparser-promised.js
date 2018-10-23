/* eslint-disable */

/*
Copied from https://github.com/alabeduarte/feedparser-promised
and adjusted to return the feed's meta data as well as items instead
of just the items
*/

import request from 'request';
import FeedParser from './feedparser';

const parse = (requestOptions, feedparserOptions) => {
  return new Promise((resolve, reject) => {
    const feedparser = new FeedParser(feedparserOptions)
      .on('error', reject)
      .on('response', resolve);

    request
      .get(requestOptions)
      .on('error', reject)
      .pipe(feedparser);
  });
};

export default parse;
