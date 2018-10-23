/* eslint-disable */

/*
Copied from https://github.com/alabeduarte/feedparser-promised
and adjusted to return the feed's meta data as well as items instead
of just the items
*/

import FeedParserStream from 'feedparser';

const FeedParser = (feedparserOptions) => {
  const items = [];
  const feedparser = new FeedParserStream(feedparserOptions);

  feedparser
    .on('readable', () => {
      let item;
      while (item = feedparser.read()) {
        items.push(item);
      }
      return items;
    })
    .on('end', function next() {
      const parsed = { ...feedparser.meta, items };
      this.emit('response', parsed);
    });

  return feedparser;
};

export default FeedParser;
