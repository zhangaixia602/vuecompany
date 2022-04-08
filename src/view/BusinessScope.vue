<template>
  <HeaderPage />
  <a-carousel autoplay>
    <div v-for="(banner, index) in banners" :key="index">
      <img :src="require('../' + banner)" />
    </div>
  </a-carousel>
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
          src: "assets/01.png",
          content:
            "根据不同方式方法对模型进行真实性数据采集，达到可支持1:1还原建筑设备的制作基础。真实照片采集+CAD图纸，Blender和3DMax作图，SCARDA采集数据",
        },
        {
          title: "模型制作",
          icon: "icon-gengduo",
          src: "assets/02.png",
          content:
            "通过三维建模工具，例如：3DMAX、MAYA等，对模型的点、线、面、 贴图位置进行构建。模型构建基础形状设备设施,模型细节精度提升建设,模型贴图纹理还原真实,模型材质粗糙反射还原真实,模型效果渲染调试",
        },
        {
          title: "三维可视化功能",
          icon: "icon-gengduo",
          src: "assets/02.png",
          content:
            "基于WebGL标准自主封装框架KT 3D-SDK进行系统三维可视化功能编程，实现所看即所得。实现与真实设备的交互反控,实现与真实场景无缝衔接切换,实现数据高速统计分析",
        },
        {
          title: "大数据集成",
          icon: "icon-jiantou_xiangxia",
          src: "assets/02.png",
          content:
            "采用新一代HTML5+WebGL构架和Canvas布局的B/S 架构，电脑不 用安装任何插件软件即可运行。大数据图表可视化,图形分析化能力,交互式观察数据改变,一键集成方便部署",
        },
      ],
      menus: [
        {
          title: "石油化工",
          src: "assets/sy.jpg",
          text: "我公司遵循SIS系统回路设计过程中的“可靠性和安全性原则、可用性原则、独立性原则、标准认证原则、故障安全原则”采用冗余容错结构而集成的安全仪表系统，在石油化工、核电等重要工业领域得到广泛的应用。储油罐区监控系统是石化行业的重要仪控系统，石油化工储罐容量从几千立方到几十万立方，对监控系统的要求十分苛刻.电子监管系统（ICQ）是我公司与政府部门在信息化领域内技术合作的典范，将先进测量技术、实时数据采集、在线校准、远程访问和数据统计分析管理等技术应用到出口成品油数量和重量鉴定领域，它改变了商检沿用船舱计重的惯例，解决了大通关背景下船舱静态计量模式偏差大、效率低的问题，实现了出口成油商检模式的创新.",
          position: "right",
        },
        {
          title: "电力",
          src: "assets/dl.png",
          text: "公司主要致力于火电厂信息化辅控系统（实现了辅控系统与工厂DCS系统、MIS系统的数据共享）,火电厂水处理控制系统（实施完成的多套生水、锅炉补给水、凝结水、循环水、工业废水和机组排水等电厂水处理系统）,污染源排放（烟气）在线监控系统（在线监测是由分布在各个污染源现场的监测仪器、摄像头、控制系统、通讯设备以及应用软件组成）,核电仪控系统（核电数字化仪控系统要求具备高安全性、高可靠性，开放灵活、控制功能齐全、控制算法丰富，能精确和实时测量大量核物理、热工、水利等特性参数）。",
          position: "left",
        },
        {
          title: "市政水处理信息化系统",
          src: "assets/ws.png",
          text: "污水处理信息化系统（基于PLC的分布式控制方案实现了低成本和高可靠的统一，保证污水处理过程的质量，使得出水水质符合规定的标准），供水信息化系统（公司在水厂的变频节能技术、供水综合自动化系统、供水厂管控一体化系统有深入的研究和许多成功的应用业绩），污染源排放（废水）在线监测仪表系统（我公司根据政府对监管的要求和用户的实际需求，提供多参数“污染源排放在线监测仪表系统”）。",
          position: "right",
        },
        {
          title: "水利自动化工程",
          src: "assets/sl.png",
          text: "大坝安全监测系统（系统基于B/S结构来实现,，用户端无需安装应用程序，能上网就能监视水情状态；可充分发挥图形化应用程序的丰富界面功能），泵站控制和信息化系统（根据泵站自动化、信息化的需求，采用开放式分层分布结构的计算机监控方式，使泵站运行管理智能化，可实现对水泵机组、水闸、配电系统、进出水池、直流系统、消防系统、技术供水系统、液压系统及其它泵站运行重要部位与关键对象、参数进行有效监视、监测和控制，实现报警记录、智能分析设备效能、自动生成报表，数据、图像的储存、上传和归档，提高管理和办公自动化水平.）。",
         position: "left",
        },
        {
          title: "环境监控系统",
          src: "assets/hj.jpg",
          text: "净化空调控制系统(实现各种安全保护、联锁、节能运行等功能)，轨道交通BAS系统(我公司承担建设的轨道交通综合监控系统涉及“环境与设备监控系统-BAS”、“电力监控系统-PSCADA”、“火灾报警系统-FAS”。)，楼宇中央空调节能与控制系统(提供常规中央空调系统、冰蓄冷系统、集中供冷系统的自动化、智能化和信息化解决方案)，润版液处理控制系统(在印刷中快速达到水墨平衡，降低废品率，提高生产速率)。",
          position: "right",
        },
        {
          title: "智慧园区",
          src: "assets/dl.png",
          text: "公司主要致力于火电厂信息化辅控系统（实现了辅控系统与工厂DCS系统、MIS系统的数据共享）,火电厂水处理控制系统（实施完成的多套生水、锅炉补给水、凝结水、循环水、工业废水和机组排水等电厂水处理系统）,污染源排放（烟气）在线监控系统（在线监测是由分布在各个污染源现场的监测仪器、摄像头、控制系统、通讯设备以及应用软件组成）,核电仪控系统（核电数字化仪控系统要求具备高安全性、高可靠性，开放灵活、控制功能齐全、控制算法丰富，能精确和实时测量大量核物理、热工、水利等特性参数）。",
          position: "left",
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
</style>