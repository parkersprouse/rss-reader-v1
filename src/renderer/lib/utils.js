export default {
  call(promise) {
    return promise
      .then(data => [null, data])
      .catch(err => [err]);
  },
  isImage(url) {
    return url.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) !== null;
  },
};
