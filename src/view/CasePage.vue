<template>
  <HeaderPage/>
  <div>案例演示公司指南</div>
  <FooterPage/>
  <ToTop/>
</template>
<script>
import HeaderPage from '@/components/HeaderPage'
import FooterPage from '@/components/FooterPage'
import ToTop from '@/components/ToTop'
export default {
  name: 'CasePage',
  components: {
    'HeaderPage': HeaderPage,
    'FooterPage': FooterPage,
    'ToTop': ToTop
  },
}
</script>
