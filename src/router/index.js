import { createRouter,createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage'
import AboutPage from '@/components/AboutPage'
import CasePage from '@/components/CasePage'
const routerHistory=createWebHistory()
export default createRouter({
  history:routerHistory,
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
