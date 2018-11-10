import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
import vmodal from 'vue-js-modal';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles.scss';

import App from './App';
import router from './router';

Vue.use(require('vue-electron'));
Vue.use(ElementUI);
Vue.use(vmodal, { dynamic: true, injectModalsContainer: true });

Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App />',
}).$mount('#app');
