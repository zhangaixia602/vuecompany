<template>
  <a-carousel autoplay>
    <div><img src="../assets//banner.png" alt="智慧园区" /></div>
    <div><img src="../assets//banner01.png" alt="智慧园区" /></div>
    <div><img src="../assets//banner02.png" alt="智慧园区" /></div>
    <div><img src="../assets//banner03.png" alt="智慧园区" /></div>
  </a-carousel>
   <a-tabs v-model:activeKey="activeKey" centered>
    <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
    <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
    <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
  </a-tabs>
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
  height:28rem;
  line-height:28rem;
  background: #364d79;
  overflow: hidden;
}
</style>