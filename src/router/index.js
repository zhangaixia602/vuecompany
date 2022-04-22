import { createRouter,createWebHistory } from 'vue-router'
import HomePage from '@/view/HomePage'
import AboutPage from '@/view/AboutPage'
import CasePage from '@/view/CasePage'
import BusinessScope from '@/view/BusinessScope'
import ModelPage from '@/view/ModelPage'
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
      path: '/business',
      name: '业务领域',
      component: BusinessScope
    },
    {
      path: '/case',
      name: '案例演示',
      component: CasePage
    },
    {
      path: '/about',
      name: '关于我们',
      component: AboutPage
    },
    {
      path: '/:id',
      name: '示例',
      component: ModelPage
    }
  ]
})
