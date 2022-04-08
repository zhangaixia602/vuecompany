import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import router from './router';
import {setLanguage} from './locales/setLanguage';
import 'ant-design-vue/dist/antd.css';
import './assets/css/common.css';
import './assets/font/iconfont.css';
import 'video.js/dist/video-js.css'

createApp(App).use(Antd).use(router).use(setLanguage()).mount("#app");
