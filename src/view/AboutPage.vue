<template>
  <HeaderPage/>
  <a-carousel autoplay>
    <div v-for="(banner, index) in banners" :key="index">
      <img :src="require('../' + banner)" />
    </div>
  </a-carousel>
  <div>     
    <div>
      <div class="wrapper">
        <h3 class="titbg">公司简介<span>main areas</span></h3>
        <div v-for="(menu, index) in menus" :key="index" class="caseItem clear">
          <div
            :class="{
              rtl: menu.position === 'left',
              ltr: menu.position === 'right',
            }"
          >
            <p
              style="font-size: 24px; color: rgb(36, 36, 37); font-weight: 550"
            >
              {{ menu.title }}
            </p>
            <p>{{ menu.text }}</p>
          </div>
          <img
            :src="require('../' + menu.src)"
            :class="{
              rtl: menu.position === 'right',
              ltr: menu.position === 'left',
            }"
          />
        </div>
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
  name: "AboutPage",
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

      menus: [
        {
          title: "关于达英和自动化工程有限公司",
          src: "assets/c01.png",
          text: "成立于1996年，集工程研究、产品和软件开发、系统集成、产品销售和技术服务于一体的高新技术企业，始终致力于用最新的工艺、最新的技术为社会和企业发展提供及时、高效的服务和保障。公司荟萃了一批年富力强的高技术人才、锤炼成有一支勇于进取的实干队伍，建立了完整的管理体系和质量保证体系，始终以诚信、热情、双赢、创新而负责任的理念服务各行业用户。公司与西北工业大学、华南理工大学、深圳职业技术学院等高校建立了紧密的技术协作关系；与SIEMENS、ROCKWELL AUTOMATION、ABB、HONEYWELL、EMERSON等国外著名公司达成了系统集成商、技术合作伙伴或战略合作伙伴的业务联系。",
          position: "left",
        },
        {
          title: "关于效果图",
          src: "assets/c02.png",
          text: "效果图是通过计算机三维仿真软件技术来模拟真实环境的高仿真虚拟图片。在园区、工业等细分行业来看，效果图的主要功能是将平面的图纸三维化，仿真化，通过高仿真的制作，来检查设计方案的细微瑕疵或进行项目方案修改的推敲。",
          position: "right",
        },
        {
          title: "关于数字可视化",
          src: "assets/15.png",
          text: "简单地说，数据可视化就是以图形化方式表示数据。决策者可以通过图形直观地看到数据分析结果，从而更容易理解复杂的数据集，以进一步获得更细节的信息，交互式地观察数据改变或处理过程。",
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
.box-c {
  display: flex;
  justify-content: center;
  align-items: center;
}
.box-f {
  height: 500px;
  border-radius: 4px;
  /* background-color: #6f7936; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.box-t {
  display: flex;
  position: relative;
  /* background-color: #364d79; */

  width: 100%;
  flex-direction: column;
}
.img {
  width: 640px;
  aspect-ratio: auto 640 / 385;
  height: 385px;
}
.box-r {
  width: 672px;
  margin-left: 40px;
}
.tabItem {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 18rem;
}
.tabItem img {
  width: 15.5rem;
  height: 13rem;
}
.tabItem p {
  width: 40rem;
  height: 10rem;
  padding: 3rem 3.2rem;
  background: white;
  box-shadow: 0.4rem 0.7rem 0.8rem 0 rgb(237 241 247 / 60%);
  border-radius: 0.5rem;
  font-size: 0.6rem;
  color: #2d2e33;
  text-indent: 2em;
}

h3.titbg {
  background: url(../assets/titbg.jpg) no-repeat bottom center;
  padding: 1rem;
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
  padding: 1rem;
}
.caseItem img {
  width: 28rem;
  height: 16rem;
}

.caseItem p {
  font-size: 0.7rem;
  font-family: Microsoft YaHei;
  color: #666;
  line-height: 1.5rem;
  text-align: left;
  text-indent: 2em;
  margin-bottom: 2rem;
}
</style>

