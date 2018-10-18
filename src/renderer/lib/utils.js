export default {
  call(promise) {
    return promise
      .then(data => [null, data])
      .catch(err => [err]);
  },
};
