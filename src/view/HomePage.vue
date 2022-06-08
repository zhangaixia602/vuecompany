<template>
	<HeaderPage :isFullpage="true" />
	<swiper :direction="'vertical'" :slidesPerView="1" :spaceBetween="30" :mousewheel="true" :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide><img src="../assets/banner01.png">    
  <h4 class='text'>智慧城市 数字赋能</h4>
	<h4 class='text'>产业变革 慧领未来</h4>
	<p class='p-text'>技术引领世界 创新照耀未来</p>
     </swiper-slide>
    <swiper-slide>
    <div class="container-left"><p class="subtitle">公司概况</p></div>
    <div class="containers-right">
      <div class="container-top">
      <video autoplay="true" loop>
      <source :src="require('../assets/water.mp4')" type="video/mp4" />
    </video>
    </div>
    <div class="container-bottom">公司简介<p class="gk-content">成立于1996年，集工程研究、产品和软件开发、系统集成、产品销售和技术服务于一体的高新技术企业，始终致力于用最新的工艺、最新的技术为社会和企业发展提供及时、高效的服务和保障。公司荟萃了一批年富力强的高技术人才、锤炼成有一支勇于进取的实干队伍，建立了完整的管理体系和质量保证体系，始终以诚信、热情、双赢、创新而负责任的理念服务各行业用户。公司与西北工业大学、华南理工大学、深圳职业技术学院等高校建立了紧密的技术协作关系；与SIEMENS、ROCKWELL AUTOMATION、ABB、HONEYWELL、EMERSON等国外著名公司达成了系统集成商、技术合作伙伴或战略合作伙伴的业务联系。</p></div>
    </div>
    </swiper-slide
    ><swiper-slide><div class="container-left"><p class="subtitle">核心业务</p></div>
    <div class="container-right">
      <div class="caseItem clear" v-for="(menu, index) in menus" :key="index">
    	<router-link  :to="menu.path" target="_blank" >
				<img :src="require('../' + menu.src)" />			
				<p class="titles">{{ menu.title }}</p>
		  </router-link>
      </div>
      </div>
		</swiper-slide>
		<swiper-slide> 
    <div class="homeCase">
    <div class="wrapper">
      <h3 class="titbg">合作伙伴</h3>
      <div class="partnerBox">
        <span v-for="(partner, index) in partners" :key="index">
          <img :src="require('../' + partner)" />
        </span>
      </div>
    </div>
  </div>
  </swiper-slide>	    
	</swiper>
   <div class="wrappers">
   <span style="margin-right: 10px;">Copyright ©2019深圳市达英和自动化工程有限公司.版权所有</span>
   <a href="http://beian.miit.gov.cn/" target="_blank" style="color:#FFFFFF">粤ICP备2022047319号</a>
   </div>
</template>
<script>
	import {
		Swiper,
		SwiperSlide
	} from "swiper/vue";
	import HeaderPage from "@/components/HeaderPage";
	import "swiper/css";
	import "swiper/css/pagination";
	import {
		Mousewheel,
		Pagination
	} from "swiper";
	export default {
		name: "HomePage",
		components: {
			HeaderPage: HeaderPage,     
			Swiper,
			SwiperSlide,
		},
		data() {
			return {
				menus: [{
						src: "assets/banner.jpg",
						title: "智慧楼宇",
            path: '/case'
						
					},
					{
						src: "assets/banner2.jpg",
						title: "智慧水利",
            path: '/model/water'
						
					},
					{
						src: "assets/banner3.jpg",
						title: "智慧能源",
            path: '/model/granary'
						
					}
			
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
			}

		},
		setup() {
			return {
				modules: [Mousewheel, Pagination],
			};
		},
	};
</script>
<style scoped>
body{
  overflow: hidden;
}
	.swiper {
		width: 100%;
		height: 100vh;
	}

	.swiper-slide {
		text-align: center;
		font-size: 18px;
		background: #fff;
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
		text-align: center;
		font-size: 18px;
		background: #fff;
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
	}

	.zt {
		position: absolute;
		max-width: 100%;
		max-height: 100%;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		min-height: 100%;
		line-height: 625px;
		font-size: 3rem;
	}

	.container-left {
    display:flex;
    align-items: center;
    justify-content: center;
		background-color: black;
		width: 18%;
    min-height: 100%;
		
		transform: translate3d(0, 0, 0);

	}

	.container-right {
		width: 82%;
		height: 100vh;
    display: flex;
    justify-content: space-between;
	}
  
	.containers-right {
		width: 82%;
		height: 100%;
    
	}

	.container-top {
		width: 100%;
		height: 70%;
	}

	.container-bottom {
		width: 100%;
		height: 30%;
    padding:10px;
    color:#ffffff;
		background-color: #000000;
	}

	.subtitle {
		font-size: 35px;
		/* line-height: 800px; */
		text-align: left;
		color: #dedede;
		padding: 0 48%;
    box-sizing: border-box;	
		width: 100%;
		font-weight: 100;
		text-align: center;
		vertical-align: middle;
	}

	.caseItem {    
    overflow: hidden;    
    width: 32.8%;
    height: 100vh;
    white-space: nowrap;
		
		/* height: 100vh;
		width: 25%; */
    animation: 1s ease 0.4s 1 normal backwards running fadeInUp2;

	}
 
  @keyframes fadeInUp2 {
    0% {
    opacity: 0;
    -webkit-transform: translate3d(0,100%,0);
    transform: translate3d(0,100%,0);
}

100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
}
    
  }
  .gk-content{
     padding: 1rem 3.2rem; 
     color:white;  
     font-size:16px;
     text-indent: 2em;

  }
 


	.caseItem img {
		width: 100%;
		height: 90%;
    bottom: 0;
    transition: all 0.36s ease;

	}
  .caseItem  p{
    bottom: -35%;
    height: 26vh;
    padding: 24px 40px;
    transition: all 0.36s ease;
    background: #b71f31;
  }
  .titles{
    color: #fff;
    font-size: 20px;
    padding-bottom: 5px;

  }
.clear:after{
    clear: both;
    display: block;    
}
	video {
		height: 100%;
		width: 100%;
		object-fit: fill;
	}
  .homeCase {
  width: 100%;
  height: 100vh;
  /* height:30rem;
  margin-top: 2.5rem; */
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
.partnerBox {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
}
.partnerBox span {
  display: inline-block;
  height: 10%;
  width: 10%;
  padding: 0.1rem;  
}
.partnerBox span img {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.wrapper{
  display: flex;
  justify-content: space-between;
  background-color: #000000;
  width:100%;
  min-height: 100vh;
  align-items: center;
  
}
.wrappers{
    background-color: #000000;
    color: #ffffff;
    text-align: center;
    width: 100%;
    height: auto;
    padding: 10px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
}
.text{
  font-family:"Microsoft YaHei";
  color:#fff;
  background-clip: text;
}
 h4,.p-text{
  position: absolute;
  top:24%;
  left: 50%;
  transform: translateX(-50%);
  font-size:3rem;
}
 h4:last-of-type{
  top:38%;
}
.p-text{
  top:56%;
  font-family:"Microsoft YaHei";
  color:#fff;
  font-size:1.5rem;
}
</style>
