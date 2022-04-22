<template>
  <div>{{this.timeArry.timeText}}</div>
</template>
<script>
import {formatDate} from '@/utils/index';
export default {
  name: 'DatePage',
  data () {
    return {
        timeArry:{},
        timer:null
    }
  },
  created() {
    this.timeArry = formatDate(new Date());
  },
  methods: {
    timeStart() {
        const that=this;
      // 设置定时器
      that.timer = setInterval(() => {
        that.timeArry = formatDate(new Date());
      }, 1000);
    }
  },
    mounted(){
        this.timeStart()
    },
    beforeUnmount(){
        this.timer=null;
    }
}
</script>
<style scoped>
</style>
