import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
import VueElectron from 'vue-electron';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles.scss';

import App from './App';
import router from './router';
import store from './store';

if (!process.env.IS_WEB) Vue.use(VueElectron);
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
