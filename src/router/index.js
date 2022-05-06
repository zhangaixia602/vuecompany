import { createRouter,createWebHistory } from 'vue-router'
const routerHistory=createWebHistory()
export default createRouter({
  history:routerHistory,
  routes: [
    {
      path: '/',
      name: '首页',
      component: () => import('@/view/HomePage')
    },
    {
      path: '/business',
      name: '业务领域',
      component: () => import('@/view/BusinessScope')
    },
    {
      path: '/case',
      name: '案例演示',
      component: () => import('@/view/CasePage')
    },
    {
      path: '/about',
      name: '关于我们',
      component: () => import('@/view/AboutPage')
    },
    {
      path: '/cesium',
      name: '测试',
      component: () => import('@/view/EarthPage')
    },
    {
      path: '/model/:id',
      name: '示例',
      component: () => import('@/view/ModelPage')
    }
  ]
})
