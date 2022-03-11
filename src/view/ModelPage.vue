<template>
  <component :is="currentComponent"></component>
</template>
<script>
import InsectPage from '@/view/InsectPage'
import FactoryPage from '@/view/FactoryPage'
export default {
  name: 'ModelPage',
  components: {
    'InsectPage': InsectPage,
    'FactoryPage': FactoryPage
  },
  data () {
    return {
      currentComponent:'',
      Allcomps: [
        {
          id: 'insect',
          component: 'InsectPage'
        },
        {
          id: 'factory',
          component: 'FactoryPage'
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
