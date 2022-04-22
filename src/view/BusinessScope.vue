<template>
  <HeaderPage />
  <!-- <a-carousel autoplay>
    <div v-for="(banner, index) in banners" :key="index">
      <img :src="require('../' + banner)" />
    </div>    
  </a-carousel> -->
   <div class='caseHeader'>
      <h2>行业痛点</h2>
      <p>目前园区、工厂所涉及的信息要素较多、信息流转也较快，日常运维过程中难免发生各项故障，如不及时处理，可能会给园区带来极大损失。而园区、能源等管理系统相互独立，不同系统间的信息互联和沟通成本高，导致园区整体运维效率低。</p>
      <p>为了解决这一问题，我们运用三维可视化底层技术，将二维、三维数据有机联合，同时使各系统数据信息统一运筹，可管控。</p>
    </div>
  <section>
    <div class="wrapper">
      <h2 class="titbgl">可视化工程制作的主要流程</h2>
      <p class="des">
        可视化制作过程共分为4大步骤流程，随着每一个步骤制作，系统整体真实可视化性也逐步实现。
      </p>
      <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane v-for="(tab, index) in tabs" :key="index">
          <template #tab>
            <div>
              {{ tab.title }}
              <i class="icon iconfont" :class="tab.icon"></i>
            </div>
          </template>
          <div class="tabItem">
            <img :src="require('../' + tab.src)" />
            <p>{{ tab.content }}</p>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </section>
  <div class="homeCase">
    <div class="wrapper">
      <h3 class="titbg">主要领域<span>main areas</span></h3>
      <div v-for="(menu, index) in menus" :key="index" class="caseItem clear">
        <div
          :class="{
            ltr: menu.position === 'right',
            rtl: menu.position === 'left',
          }"
        >
          <h2>{{ menu.title }}</h2>
          <p>{{ menu.text }}</p>
          <router-link  :to="menu.path" target="_blank" :key='index'>
            案例详情<i class="icon iconfont icon-chakanxiangqing"></i>
          </router-link>
        </div>
        <img
          :src="require('../' + menu.src)"
          :class="{
            ltr: menu.position === 'left',
            rtl: menu.position === 'right',
          }"
        />
      </div>
    </div>
  </div>
  <FooterPage/>
  <ToTop/>
</template>
<script>
import { defineComponent } from "vue";
import HeaderPage from '@/components/HeaderPage'
import FooterPage from '@/components/FooterPage'
import ToTop from '@/components/ToTop'
export default defineComponent({
  name: "BusinessScope",
  components: {
    'HeaderPage': HeaderPage,
    'FooterPage': FooterPage,
    'ToTop': ToTop
  },
  data() {
    return {
      banners: [
        "assets/banner.png",
        "assets/banner01.png",
        "assets/banner02.png",
        "assets/banner03.png",
      ],
      tabs: [
        {
          title: "数据模型采集",
          icon: "icon-gengduo",
          src: "assets/cj.png",
          content:
            "现如今园区、景区、工厂涉及的信息要素很多，对数据模型采集我们根据不同方式方法对模型进行真实性数据采集，达到可支持1:1还原建筑设备的制作基础。真实照片采集+CAD图纸，Blender和3DMax作图，SCARDA采集数据",
        },
        {
          title: "模型制作",
          icon: "icon-gengduo",
          src: "assets/model.png",
          content:
            "我们通过三维建模工具，例如：3DMAX、MAYA等，对模型的点、线、面、 贴图位置进行构建。模型构建基础形状设备设施,模型细节精度提升建设,模型贴图纹理还原真实,模型材质粗糙反射还原真实,模型效果渲染调试",
        },
        {
          title: "三维可视化功能",
          icon: "icon-gengduo",
          src: "assets/3D.png",
          content:
            "基于WebGL标准自主封装框架KT 3D-SDK进行系统三维可视化功能编程，实现所看即所得。实现与真实设备的交互反控,实现与真实场景无缝衔接切换,实现数据高速统计分析",
        },
        {
          title: "大数据集成",
          icon: "icon-jiantou_xiangxia",
          src: "assets/dsj.png",
          content:
            "采用新一代HTML5+WebGL构架和Canvas布局的B/S 架构，电脑不 用安装任何插件软件即可运行。大数据图表可视化,图形分析化能力,交互式观察数据改变,一键集成方便部署",
        },
      ],
      menus: [            
      
        {
          title: "智慧园区",
          src: "assets/yq.png",
          text: "利用Threejs,WebGL技术，将3G大小BIM楼宇模型轻松展示在网页端，让整个园区与分层信息实现3D可视化集成展示园区多功能运维管理系统，对接线下IOT设备接口，实时数据展示，降低风险损失。结合GIS地图、实景三维、BIM模型和单物品模型，通过3D展示技术实现城市全景展示、园区地理位置、楼房室内布局的3D可视化。",
          position: "left",
          path: '/model/insect' 
        },
        {
          title: "智慧水利",
          src: "assets/water.png",
          text: "采用3D仿真技术，将数据中心园区、建筑、机房、机柜、设备、端口等逐级可视化呈现，可自定义路线巡检，提高运维管理效率。数字孪生线上线下，实时监控反馈设备运行状态，及时预警。客户端程序设计，安全系数更高。",
          position: "right",
          path: '/model/water' 
        },  
         {
          title: "智慧能源",
          src: "assets/ny.png",
          text: "基于三维仿真技术，将综合能源园区、楼宇、设备、管线等3D展示，实现全局能源安全可视化管理系统将各类能源监控数据集中整合，联通IOT实时数据，快速可视化分析，实现智能互联，提升企业能源管理效率。实时数据仿真，对配电房、路灯等实时监控、一键自动化智慧管理，线上线下实时同步，实现能源安全标准化管理。",
          position: "left",
          path: '/model/granary' 
        },
      ],
    };
  },
});
</script>
<style scoped>
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height:100vh;
  line-height:100vh;
  background: #364d79;
  overflow: hidden;
}
.caseHeader{
  width:100%;
  height:100vh;
  background:url(../assets/hy.png) no-repeat center center;
  background-size: cover;
  padding:7rem 6rem;
  color: #fffefe;
}
.caseHeader h2{
  font-size:3rem;
  color: #fffefe;  
  position: relative;
  animation: rotate3 3s linear infinite;
 
}
@keyframes rotate2{
0% { margin-left:800px; }
20% { margin-left:-800px; }
35% { margin-left:0px; }
100% { margin-left:0px; }
}
@keyframes rotate3 {
  0%{ text-shadow: 0 0 4px rgb(245, 12, 12)}
  50%{ text-shadow: 0 0 40px rgb(4, 250, 106)}
  100%{ text-shadow: 0 0 4px rgb(247, 246, 246)}
}
.caseHeader p{
  width:43%;
  font-size:0.8rem;
  font-family: SimHei;
  padding-top: 16px;
  animation: rotate3 2000ms 2000ms linear;
}
section {
  background: linear-gradient(0deg, #f2f7fb, #f2f7fb);
  height: 30rem;
  padding-top: 1rem;
}
.tabItem {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 18rem;
  background-color: #ffffff;
  border-radius: 10px;
}
.tabItem img {
  width: 60rem;
  height: 17rem;
  padding: 20px;
  padding-left: 20;
}
.tabItem p {
  width: 40rem;
  height: 16rem;
  padding: 0rem 2.2rem;
  font-size: 16px;
  color: #2d2e33;
  text-indent: 2em;
  line-height: 2rem;
}
.homeCase {
  padding: 2.5rem;
  padding: 2.5rem 0;
}
h3.titbg {
  background: url(../assets/titbg.jpg) no-repeat bottom center;
  padding-bottom: 1rem;
  margin: 0;
  font-size: 1.3rem;
  text-align: center;
  color: #444444;
}
h2.titbgl {
  padding-bottom: 1rem;
  margin: 0;
  font-size: 1.3rem;
  text-align: center;
  color: #444444;
}
h3.titbg span {
  font-size: 0.7rem;
  display: block;
  text-transform: uppercase;
  line-height: 2rem;
  color: #999999;
}
.des {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 300;
  color: #aaa7a7;
  padding-bottom: 1rem;
  text-align: center;
}
.caseItem {
  height: 18rem;
  margin-top: 2.5rem;
  box-shadow: 0.4rem 0.7rem 1rem 0 rgb(237 241 247 / 80%), 0 0 0 3px #fff;
  border-radius: 0.3rem;
}
.caseItem div {
  width: 50%;
  height: 100%;
  text-align: center;
}
.caseItem img {
  width: 28rem;
  height: 16rem;
}
.caseItem h2 {
  position: relative;
  padding-left: 1.5rem;
}
.caseItem h2:before {
  content: "";
  display: block;
  width: 0.2rem;
  height: 1.3rem;
  background: #038bff;
  border-radius: 2px;
  display: block;
  position: absolute;
  top: 50%;
  left: 230px;
  transform: translateY(-50%);
}
.caseItem p {
  letter-spacing: 1.5px;
  font-size: 0.7rem;
  font-family: Microsoft YaHei;
  color: #666;
  line-height: 1.5rem;
  text-align: left;
  text-indent: 2em;
  margin-bottom: 2rem;
}
.caseItem a {
  padding: 0.4rem;
  border: 1px solid #038bff;
  background-color: #fff;
  border-radius: 1.2rem;
  font-size: 20px; 
}
.more {
  width: 6rem;
  height: 2rem;
  background: #f5f7f9;
  margin: 3rem auto;
  border-radius: 1rem;
  color: #2d2e33;
  font-size: 0.8rem;
}
.more .icon,
.caseItem .icon {
  margin-left: 0.3rem;
  font-size: 0.7rem;
}
</style>