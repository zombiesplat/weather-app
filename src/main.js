import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import {store} from "./store";

window.bus = new Vue();

import LoadScript from 'vue-plugin-load-script';
Vue.use(LoadScript);
window.googleMapsInit = function() {
  window.bus.$emit('googleMapsInit');
};

Vue.config.productionTip = false

require('./filters');

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
