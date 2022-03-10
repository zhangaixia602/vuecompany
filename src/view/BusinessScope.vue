<template>
  <a-carousel autoplay>
    <div v-for="(banner, index) in banners" :key="index">
      <img :src="require('../' + banner)" />
    </div>
  </a-carousel>
  <section>
    <div class="wrapper">
      <h2 class="titbgl">可视化工程制作的主要流程</h2>
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
      <h3 class="titbg">业务总览<span>main areas</span></h3>
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
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BusinessScope",
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
          src: "assets/01.png",
          content:
            "电子监管系统（ICQ）是我公司与政府部门在信息化领域内技术合作的典范，将先进测量技术、实时数据采集、在线校准、远程访问和数据统计分析管理等技术应用到出口成品油数量和重量鉴定领域，它改变了商检沿用船舱计重的惯例，解决了大通关背景下船舱静态计量模式偏差大、效率低的问题，实现了出口成油商检模式的创新。电子监管系统的应用，实现了反欺诈的功能，有效地挽回企业不必要的经济损失并加快了通关速度，体现了政府部门服务企业的高时效性，树立了良好的检验检疫形象。以往进行的船舱计量，由于多种原因，计量结果常会受到贸易关系人的质疑，而且由于检验现场的不可复现性，难以用有力的证据来解释。电子监控系统后，对装船过程中的异常情况随时发现、随时处理，建立了公平、公正、公开的计量形象。",
        },
        {
          title: "模型制作",
          icon: "icon-gengduo",
          src: "assets/02.png",
          content:
            "是我公司与政府部门在信息化领域内技术合作的典范，将先进测量技术、实时数据采集、在线校准、远程访问和数据统计分析管理等技术应用到出口成品油数量和重量鉴定领域，它改变了商检沿用船舱计重的惯例，解决了大通关背景下船舱静态计量模式偏差大、效率低的问题，实现了出口成油商检模式的创新。电子监管系统的应用，实现了反欺诈的功能，有效地挽回企业不必要的经济损失并加快了通关速度，体现了政府部门服务企业的高时效性，树立了良好的检验检疫形象。以往进行的船舱计量，由于多种原因，计量结果常会受到贸易关系人的质疑，而且由于检验现场的不可复现性，难以用有力的证据来解释。电子监控系统后，对装船过程中的异常情况随时发现、随时处理，建立了公平、公正、公开的计量形象。",
        },
        {
          title: "三维可视化功能",
          icon: "icon-gengduo",
          src: "assets/02.png",
          content:
            "是我公司与政府部门在信息化领域内技术合作的典范，将先进测量技术、实时数据采集、在线校准、远程访问和数据统计分析管理等技术应用到出口成品油数量和重量鉴定领域，它改变了商检沿用船舱计重的惯例，解决了大通关背景下船舱静态计量模式偏差大、效率低的问题，实现了出口成油商检模式的创新。电子监管系统的应用，实现了反欺诈的功能，有效地挽回企业不必要的经济损失并加快了通关速度，体现了政府部门服务企业的高时效性，树立了良好的检验检疫形象。以往进行的船舱计量，由于多种原因，计量结果常会受到贸易关系人的质疑，而且由于检验现场的不可复现性，难以用有力的证据来解释。电子监控系统后，对装船过程中的异常情况随时发现、随时处理，建立了公平、公正、公开的计量形象。",
        },
        {
          title: "大数据集成",
          icon: "icon-jiantou_xiangxia",
          src: "assets/02.png",
          content:
            "是我公司与政府部门在信息化领域内技术合作的典范，将先进测量技术、实时数据采集、在线校准、远程访问和数据统计分析管理等技术应用到出口成品油数量和重量鉴定领域，它改变了商检沿用船舱计重的惯例，解决了大通关背景下船舱静态计量模式偏差大、效率低的问题，实现了出口成油商检模式的创新。电子监管系统的应用，实现了反欺诈的功能，有效地挽回企业不必要的经济损失并加快了通关速度，体现了政府部门服务企业的高时效性，树立了良好的检验检疫形象。以往进行的船舱计量，由于多种原因，计量结果常会受到贸易关系人的质疑，而且由于检验现场的不可复现性，难以用有力的证据来解释。电子监控系统后，对装船过程中的异常情况随时发现、随时处理，建立了公平、公正、公开的计量形象。",
        },
      ],
      menus: [
        {
          title: "智慧园区",
          src: "assets/case1.png",
          text: "通过大量物联网设备数据采集、清洗、加工、存储等基本数据治理后，基于业务规则、数据标准将非同源的数据横向拉通构建完整统一的园区管理数字孪生系统。为园区各类应用提供数据支持和业务创新，减少各业务部门信息资源协调难度，让管理者所见即所得辅助管理者对园区的管理和运营。",
          position: "right",
        },
        {
          title: "智慧园区",
          src: "assets/case1.png",
          text: "通过大量物联网设备数据采集、清洗、加工、存储等基本数据治理后，基于业务规则、数据标准将非同源的数据横向拉通构建完整统一的园区管理数字孪生系统。为园区各类应用提供数据支持和业务创新，减少各业务部门信息资源协调难度，让管理者所见即所得辅助管理者对园区的管理和运营。",
          position: "left",
        },
        {
          title: "智慧园区",
          src: "assets/case1.png",
          text: "通过大量物联网设备数据采集、清洗、加工、存储等基本数据治理后，基于业务规则、数据标准将非同源的数据横向拉通构建完整统一的园区管理数字孪生系统。为园区各类应用提供数据支持和业务创新，减少各业务部门信息资源协调难度，让管理者所见即所得辅助管理者对园区的管理和运营。",
          position: "right",
        },
      ],
      partners: [
        "assets/partner/1.png",
        "assets/partner/2.png",
        "assets/partner/3.jpg",
        "assets/partner/4.png",
      ],
    };
  },
});
</script>
<style scoped>
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 28rem;
  line-height: 28rem;
  background: #364d79;
  overflow: hidden;
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
  width: 30.5rem;
  height: 17rem;
  padding: 5px;
}
.tabItem p {
  width: 40rem;
  height: 16rem rem;
  padding: 0rem 1.2rem;
  font-size: 0.6rem;
  color: #2d2e33;
  text-indent: 2em;
  line-height: 2rem;
}
.homeCase {
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
h2.titbgl {
  padding-bottom: 4rem;
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
  filter: grayscale(1);
  cursor: pointer;
}
.partnerBox span img:hover {
  filter: grayscale(0);
}
</style>