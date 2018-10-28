let timer = null;

export default {
  set(func, interval) {
    if (timer) this.stop();
    timer = setInterval(func, interval);
  },
  stop() {
    if (timer) clearInterval(timer);
  },
};
