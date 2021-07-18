import { createApp } from 'vue'
import { VueShowdownPlugin } from 'vue-showdown';
import { Button, Modal } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import App from './App.vue';

const app = createApp(App);

// the second parameter of app.use() is optional
app.use(VueShowdownPlugin, {
  // set default flavor of showdown
  flavor: 'github',
  // set default options of showdown (will override the flavor options)
  options: {
    emoji: true,
  },
});

app.use(Button);
app.use(Modal);

app.mount('#app');