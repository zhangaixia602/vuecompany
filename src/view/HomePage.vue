<template>
  <HeaderPage :isFullpage="true"/>
  <section>
    <video autoplay="true" loop>
      <source :src="require('../assets/home.mp4')" type="video/mp4" />
    </video>
    <h4 class='text'>智慧城市 数字赋能</h4>
    <!-- <img :src="require('../assets/zt2.png')" /> -->
  </section>
  <section>
     <video autoplay="true" loop>
      <source :src="require('../assets/water.mp4')" type="video/mp4" />
    </video>
    <div class="wrapper">
      <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane v-for="(tab, index) in tabs" :key="index">
          <template #tab>
            <div>
              <i class="icon iconfont" :class="tab.icon"></i>
              {{ tab.title }}
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
  <!-- <div class="homeCase">
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
          <a href="javascript:void(0);"
            >查看详情<i class="icon iconfont icon-chakanxiangqing"></i
          ></a>
        </div>
        <img
          :src="require('../' + menu.src)"
          :class="{
            ltr: menu.position === 'left',
            rtl: menu.position === 'right',
          }"
        />
      </div>
      <router-link to="/case" class="more textCenter"
        >更多案例<i class="icon iconfont icon-gengduo"></i
      ></router-link>
    </div>
  </div> -->
  <div class="homeCase">
    <div class="wrapper">
      <h3 class="titbg">合作伙伴<span>partners</span></h3>
      <div class="partnerBox">
        <span v-for="(partner, index) in partners" :key="index">
          <img :src="require('../' + partner)" />
        </span>
      </div>
    </div>
  </div>
  <FooterPage />
  <ToTop />
</template>
<script>
import { defineComponent } from "vue";
import HeaderPage from "@/components/HeaderPage";
import FooterPage from "@/components/FooterPage";
import ToTop from "@/components/ToTop";
console.log(Cesium.Ion.defaultAccessToken)
export default defineComponent({
  name: "HomePage",
  components: {
    HeaderPage: HeaderPage,
    FooterPage: FooterPage,
    ToTop: ToTop
  },
  data() {
    return {
      tabs: [
        {
          title: "智慧园区",
          icon: "icon-zhihuiyuanqu",
          src: "assets/yq.png",
          content:
            "智慧园区,基于数字孪生,三维可视化等新一代技术,具备迅捷信息采集、高速信息传输、高度集中计算、智能事务处理和无所不在的服务提供能力，实现园区内及时、互动、整合的信息感知、传递和处理，以提高园区产业集聚能力、企业经济竞争力、园区可持续发展为目标的先进园区发展理念。",
        },
        {
          title: "智慧水利",
          icon: "icon-shuiliqiye",
          src: "assets/water.png",
          content:
            "水厂作为城市供水及输配水的一个核心环节，与城市的供水系统、水资源循环利用等城市管理职能有着密不可分的联系，是智慧城市的核心之一，是建设生态社会、实现环境可持续发展的重要组成部分,在云计算、大数据、移动互联网为代表的新一代信息技术推动下，创新运营管理模式，逐步实现供水系统的自动化、智能化、智慧化的运营与管理。",
        },
        {
          title: "智慧能源",
          icon: "icon-dianli",       
          src: "assets/ny.png",
          content:
            "智慧能源，即能源行业的自动化与智能化,利用大数据优化能源消耗,保障生产稳定性和连续性,是能源管理更加敏捷、精准、高效。",
        }
      ],
      menus: [
        {
          title: "智慧园区",
          src: "assets/c03.png",
          text: "通过大量物联网设备数据采集、清洗、加工、存储等基本数据治理后，基于业务规则、数据标准将非同源的数据横向拉通构建完整统一的园区管理数字孪生系统。为园区各类应用提供数据支持和业务创新，减少各业务部门信息资源协调难度，让管理者所见即所得辅助管理者对园区的管理和运营。",
          position: "right",
        },
        {
          title: "智慧园区",
          src: "assets/c03.png",
          text: "通过大量物联网设备数据采集、清洗、加工、存储等基本数据治理后，基于业务规则、数据标准将非同源的数据横向拉通构建完整统一的园区管理数字孪生系统。为园区各类应用提供数据支持和业务创新，减少各业务部门信息资源协调难度，让管理者所见即所得辅助管理者对园区的管理和运营。",
          position: "left",
        },
        {
          title: "智慧园区",
          src: "assets/c03.png",
          text: "通过大量物联网设备数据采集、清洗、加工、存储等基本数据治理后，基于业务规则、数据标准将非同源的数据横向拉通构建完整统一的园区管理数字孪生系统。为园区各类应用提供数据支持和业务创新，减少各业务部门信息资源协调难度，让管理者所见即所得辅助管理者对园区的管理和运营。",
          position: "right",
        },
        {
          title: "智慧园区",
          src: "assets/c03.png",
          text: "通过大量物联网设备数据采集、清洗、加工、存储等基本数据治理后，基于业务规则、数据标准将非同源的数据横向拉通构建完整统一的园区管理数字孪生系统。为园区各类应用提供数据支持和业务创新，减少各业务部门信息资源协调难度，让管理者所见即所得辅助管理者对园区的管理和运营。",
          position: "left",
        },
        {
          title: "智慧园区",
          src: "assets/c03.png",
          text: "通过大量物联网设备数据采集、清洗、加工、存储等基本数据治理后，基于业务规则、数据标准将非同源的数据横向拉通构建完整统一的园区管理数字孪生系统。为园区各类应用提供数据支持和业务创新，减少各业务部门信息资源协调难度，让管理者所见即所得辅助管理者对园区的管理和运营。",
          position: "right",
        },
      ],
      partners: [
        "assets/partner/1.png",
        "assets/partner/2.png",
        "assets/partner/3.jpg",
        "assets/partner/4.png",
        "assets/partner/5.png",
        "assets/partner/6.png",
        "assets/partner/7.jpg",
        "assets/partner/8.png",
        "assets/partner/9.png",
        "assets/partner/10.png",
        "assets/partner/11.png",
        "assets/partner/12.png",
        "assets/partner/13.png",
        "assets/partner/14.png",
        "assets/partner/15.png",
        "assets/partner/16.png",
        "assets/partner/k1.png",
        "assets/partner/k2.png",
        "assets/partner/k3.png",
        "assets/partner/k4.png",
        "assets/partner/k5.png",
        "assets/partner/k6.png",
        "assets/partner/k7.png",
        "assets/partner/k8.png",
        "assets/partner/k9.png",
        "assets/partner/k10.png",
        "assets/partner/k11.png",
        "assets/partner/k12.png",
        "assets/partner/k13.png",
        "assets/partner/k14.png",
        "assets/partner/k15.png",
        "assets/partner/k16.png",
        "assets/partner/k17.png",
        "assets/partner/k18.png",
        "assets/partner/k19.png",
        "assets/partner/k20.png",
        "assets/partner/k21.png",
        "assets/partner/k22.png",
        "assets/partner/k23.png",
      ],
    };
  }
});
</script>
<style scoped>
video{
  width:100%;
}
section{
  height:100vh;
  position:relative;
  overflow: hidden;
}
section>img,section h4{
  position: absolute;
  max-width:60rem;
  max-height:100%;
  top:0;
  left: 50%;
  transform: translateX(-50%);
  height:625px;
  line-height:625px;
  font-size:3rem;
}
section .wrapper{
	height:21rem;
  position: absolute;
  top:50%;
  left: 50%;
  z-index: 9999;
  transform: translate(-50%,-50%);
  background: rgba(255,255,255,0.2);
}
.ant-tabs-tab>div{
  color:white;
}
.ant-tabs-tab.ant-tabs-tab-active>div{
  color:#1890ff;
}
.ant-tabs-tab{
  font-size:1.2rem;
}
.ant-tabs-tab .iconfont{
  font-size:1.5rem;
}
.tabItem {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height:100%;
}
.tabItem img {
  width: 15.5rem;
}
.tabItem p {
  width: 40rem;
  height: 100%;
  padding: 3rem 3.2rem;
  /* background: white;
  box-shadow: 0.4rem 0.7rem 0.8rem 0 rgb(237 241 247 / 60%); */
  background: rgba(4,103,247,0.1);
  color:white;
  border-radius: 0.5rem;
  font-size:1rem;
  text-indent: 2em;
}
.homeCase {
  height:100vh;
  padding-top: 2.5rem;
}
h3.titbg {
  background: url(../assets/titbg.jpg) no-repeat bottom center;
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
.caseItem {
  height: 18rem;
  margin-top: 2.5rem;
  box-shadow: 0.4rem 0.7rem 1rem 0 rgb(237 241 247 / 80%), 0 0 0 3px #fff;
  border-radius: 0.3rem;
}
.caseItem div {
  width: 50%;
  height: 100%;
  padding: 3rem;
}
.caseItem img {
  width: 28rem;
  height: 16rem;
}
.caseItem h2 {
  position: relative;
  padding-left: 1rem;
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
  left: 0;
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
  border-radius: 0.2rem;
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
.partnerBox {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
}
.partnerBox span {
  display: inline-block;
  width: 6.4rem;
  height: 3.5rem;
  padding: 0.3rem;
}
.partnerBox span img {
  width: 100%;
  height: 100%;
  /* filter: grayscale(1); */
  cursor: pointer;
}
/* .partnerBox span img:hover {
  filter: grayscale(0);
} */
.text{
  font-size:3rem;
  background-image: linear-gradient(to right,#FFCF02, #FF7352);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; /*需要文字透明*/
}
</style>