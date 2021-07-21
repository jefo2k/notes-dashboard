import Vue from 'vue';
import App from './App.vue';
import VueShowdown from 'vue-showdown';
import Button from 'ant-design-vue/lib/button';
import 'ant-design-vue/dist/antd.css';
import api from './config/api';

Vue.prototype.$http = api;
Vue.config.productionTip = false;
Vue.component(Button.name, Button);

// the second parameter of Vue.use() is optional
Vue.use(VueShowdown, {
  // set default flavor of showdown
  flavor: 'github',
  // set default options of showdown (will override the flavor options)
  options: {
    emoji: true,
  },
})

new Vue({
  render: h => h(App),
}).$mount('#app');
