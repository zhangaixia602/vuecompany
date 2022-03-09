<template>
  <div>
    <HeaderPage :scrollTop="this.scrollTop"/>
    <router-view/>
    <FooterPage/>
    <ToTop/>
  </div>
</template>

<script>
import HeaderPage from '@/components/HeaderPage'
import FooterPage from '@/components/FooterPage'
import ToTop from '@/components/ToTop'
export default {
  name: 'App',
  components: {
    'HeaderPage': HeaderPage,
    'FooterPage': FooterPage,
    'ToTop': ToTop
  },
  data () {
    return {
      scrollTop: 0
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
