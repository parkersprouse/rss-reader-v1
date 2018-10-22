/* eslint-disable */
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
