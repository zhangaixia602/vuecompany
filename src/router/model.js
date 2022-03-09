import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import AboutPage from '@/components/AboutPage'
import CasePage from '@/components/CasePage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: HomePage
    },
    {
      path: '/about',
      name: '关于我们',
      component: AboutPage
    },
    {
      path: '/case',
      name: '案例演示',
      component: CasePage
    }
  ]
})
