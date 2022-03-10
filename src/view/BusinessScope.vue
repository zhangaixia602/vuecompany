<template>
  <HeaderPage/>
  <div>业务领域</div>
  <FooterPage/>
  <ToTop/>
</template>
<script>
import HeaderPage from '@/components/HeaderPage'
import FooterPage from '@/components/FooterPage'
import ToTop from '@/components/ToTop'
export default {
  name: 'BusinessScope',
  components: {
    'HeaderPage': HeaderPage,
    'FooterPage': FooterPage,
    'ToTop': ToTop
  }
}
</script>
