<template>
  <component :is="currentComponent"></component>
</template>
<script>
import InsectPage from '@/view/InsectPage'
import FactoryPage from '@/view/FactoryPage'
import waterPage from '@/view/waterPage'
import GranaryPage from '@/view/GranaryPage'
import EnvironmentPage from '@/view/EnvironmentPage'
export default {
  name: 'ModelPage',
  components: {
    'InsectPage': InsectPage,
    'FactoryPage': FactoryPage,
    'waterPage': waterPage,
    'GranaryPage': GranaryPage,
    'EnvironmentPage': EnvironmentPage
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
        },
        {
          id: 'water',
          component: 'waterPage'
        },
        {
          id: 'granary',
          component: 'GranaryPage'
        },
        {
          id: 'environ',
          component: 'EnvironmentPage'
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
