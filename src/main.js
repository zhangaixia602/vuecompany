import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import router from './router';
import 'ant-design-vue/dist/antd.css';
createApp(App).use(Antd).use(router).mount("#app");
