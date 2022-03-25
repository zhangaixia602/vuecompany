import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import router from './router';
import 'ant-design-vue/dist/antd.css';
import './assets/css/common.css';
import './assets/font/iconfont.css';

import 'video.js/dist/video-js.css'


createApp(App).use(Antd).use(router).mount("#app");
