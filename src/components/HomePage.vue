<template>
  <a-carousel>
    <div><h3><img src="../assets//banner.png" alt="智慧园区" /></h3></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
  </a-carousel>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage'
});
</script>
<style scoped>
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height:15rem;
  line-height:15rem;
  background: #364d79;
  overflow: hidden;
}
.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}
</style>