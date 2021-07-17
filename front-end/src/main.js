import { createApp } from 'vue'
import { VueShowdownPlugin } from 'vue-showdown';

import App from './App.vue';

const app = createApp(App);
app.mount('#app');

// the second parameter of app.use() is optional
app.use(VueShowdownPlugin, {
  // set default flavor of showdown
  flavor: 'github',
  // set default options of showdown (will override the flavor options)
  options: {
    emoji: false,
  },
});
