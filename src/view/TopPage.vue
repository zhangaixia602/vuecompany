<template>
  <HeaderPage />
  <a-carousel autoplay="true">
    <div v-for="(banner, index) in banners" :key="index">
      <video style="width:100%" :ref="'videoPlayer' + index" :controls="isIn" autoplay="true">
        <source :src="require('../' + banner)" type="video/mp4" />
      </video>
      <i v-show="!isPlay" @click="playVideo"></i>
      <i v-show="isPlay && isIn" @click="pauseVideo"></i>
    </div>
  </a-carousel>
</template>
<script>
import { defineComponent } from "vue";
import HeaderPage from "@/components/HeaderPage";

export default defineComponent({
  name: "TopPage",
  components: {
    HeaderPage: HeaderPage

  },
  data() {
    return {
      banners: ["assets/lc.mp4", "assets/lc.mp4", "assets/lc.mp4"],
      isPlay: false,//播放状态
      isIn: false,//鼠标是否位于播放器内
      cutTime: 3000,//轮播时间，单位毫秒
      nowIndex: 0,

    };
  },
   mounted() {
        //初始监听第一个视频
        this.listenVideo();
    },
    methods: {
        //获取走马灯的索引
        getIndex(nowIndex, oldIndex){
            //用户可能在上个视频未播放完毕就切换
            //此时需要暂停上个视频并把时间归零，否则影响对当前视频的监听逻辑
            let myVideo = this.$refs['videoPlayer' + oldIndex];
            myVideo[0].pause();
            myVideo[0].currentTime = 0;
            this.nowIndex = nowIndex;
            this.listenVideo();
        },
        //监听视频的播放、暂停、播放完毕等事件
        listenVideo(){
            //注意：这样获取的dom是一个数组，必须加上[0]索引才能正确的添加事件
            let myVideo = this.$refs['videoPlayer' + this.nowIndex];
            //监听播放
            myVideo[0].addEventListener("play",()=>{
                this.autoplay = false;
                this.isPlay = true;
            });
            //监听暂停
            myVideo[0].addEventListener("pause",()=>{
                this.autoplay = true;
                this.isPlay = false;
            });
            //监听播放完毕
            myVideo[0].addEventListener("ended",()=>{
                //时间归零
                myVideo[0].currentTime = 0;
                this.autoplay = true;
                this.isPlay = false;
            });
        },
        //播放视频
        playVideo(){
            //注意：这样获取的dom是一个数组，必须加上[0]索引才能正确的添加事件
            let myVideo = this.$refs['videoPlayer' + this.nowIndex];
            myVideo[0].play();
        },
        //暂停视频
        pauseVideo(){
            //注意：这样获取的dom是一个数组，必须加上[0]索引才能正确的添加事件
            let myVideo = this.$refs['videoPlayer' + this.nowIndex];
            myVideo[0].pause();
        },
    }


});
</script>
<style scoped>
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 100vh;
  line-height: 100vh;
  background: #364d79;
  overflow: hidden;
}
</style>