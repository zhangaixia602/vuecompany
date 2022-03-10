<template>
  <header :class="{shadow: this.scrollTop > 70}">
    <div class='wrapper'>
      <img  class="logo" src="../assets/logo.png">
      <nav>
        <router-link v-for="(route,index) in routes" :to="route.path" :key="index">{{route.name}}</router-link>
      </nav>
    </div>
  </header>
</template>
<script>
export default {
  name: 'HeaderPage',
  data () {
    return {
      scrollTop: 0,
      routes: [
        {
          path: '/',
          name: '首页'
        },
        {
          path: '/business',
          name: '业务领域'
        },
        {
          path: '/case',
          name: '案例演示'
        },
        {
          path: '/about',
          name: '关于我们'
        }
      ]
    }
  },
  methods: {
    handleScroll () {
      this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>
