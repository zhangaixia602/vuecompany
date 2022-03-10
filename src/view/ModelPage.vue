<template>
  <component :is="currentComponent"></component>
</template>
<script>
import InsectPage from '@/view/InsectPage'
export default {
  name: 'ModelPage',
  components: {
    'InsectPage': InsectPage
  },
  data () {
    return {
      currentComponent:'',
      Allcomps: [
        {
          id:'insect',
          component:'InsectPage'
        }
      ]
    }
  },
  methods: {
    upData () { 
      this.Allcomps.map((item)=>{
        if(item.id==this.$route.params.id){
          this.currentComponent=item.component
        }
      })
    }
  },
  mounted () {
    this.upData();
  }
}
</script>
