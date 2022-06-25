<template>
	<HeaderPage :isFullpage="true" />
	<swiper :direction="'vertical'" :slidesPerView="1" :spaceBetween="1" :mousewheel="true" :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide>  
  <img src="../assets/banner01.png" style="width:100%;height:100%">    
  <h4 class='text'>智慧城市 数字赋能</h4>
	<h4 class='text'>产业变革 慧领未来</h4>
	<p class='p-text'>技术引领世界 创新照耀未来</p>
 
  </swiper-slide>
    <swiper-slide>
     <div class="homeCase">
    <div class="container-left"><p class="subtitle">公司概况</p></div>
    <div class="containers-right">
      <div class="container-top">
      <video autoplay loop controls muted>
      <source :src="require('../assets/water.mp4')" type="video/mp4" />
    </video>
    </div>
    <div class="container-bottom">达英和自动化有限公司<p class="gk-content">成立于1996年，集工程研究、产品和软件开发、系统集成、产品销售和技术服务于一体的高新技术企业，始终致力于用最新的工艺、最新的技术为社会和企业发展提供及时、高效的服务和保障。公司荟萃了一批年富力强的高技术人才、锤炼成有一支勇于进取的实干队伍，建立了完整的管理体系和质量保证体系，始终以诚信、热情、双赢、创新而负责任的理念服务各行业用户。公司与西北工业大学、华南理工大学、深圳职业技术学院等高校建立了紧密的技术协作关系；与SIEMENS、ROCKWELL AUTOMATION、ABB、HONEYWELL、EMERSON等国外著名公司达成了系统集成商、技术合作伙伴或战略合作伙伴的业务联系。</p></div>
    </div>
    </div> 
    </swiper-slide>
    <swiper-slide>
    <div class="homeCase">
    <div class="container-left"><p class="subtitle">核心业务</p></div>
    <div class="container-right">
      <div class="hovertree-container">
      <div class="gallery">
      <div class="gallery-item" v-for="(menu, index) in menus" :key="index">
    	<router-link  :to="menu.path" target="_blank" >
				<img :src="require('../' + menu.src)"  class="gallery-item-image"/>			
				<p class="gallery-item-description">{{ menu.title }}</p>
		  </router-link>
      </div>
      </div>
      </div>
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
   <a href="http://beian.miit.gov.cn/" target="_blank" style="color:#000000">粤ICP备2022047319号</a>
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
						src: "assets/zhyq.jpg",
						title: "智慧园区",
            path: '/model/insect'
						
					},
					{
						src: "assets/banner2.jpg",
						title: "智慧能源",
            path: '/model/water'
						
					},
					{
						src: "assets/banner3.jpg",
						title: "智慧水利",
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

 

	.container-left {
    display:flex;
    align-items: center;
    justify-content: center;
		background-color: black;
		width: 18%;
    min-height: 100vh;	
		transform: translate3d(0, 0, 0);

	}

	.container-right {
	  width: 82%;
    min-height: 100vh;
    position: absolute;
    top: 0;
    left: 18%;
    background-color: #000000;
	}
  
	.containers-right {
		width: 82%;
    min-height: 100vh;
    
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
	 font-size: 1.875rem;
		/* line-height: 800px; */
	  display: flex;
    padding: 0 48%;
    justify-content: center;
    /* box-sizing: border-box; */
    align-items: center;
		color: #dedede;
		padding: 0 48%;
    box-sizing: border-box;	
		width: 100%;
		font-weight: 100;		
	}

	.caseItem {    
    overflow: hidden;    
    width: 32.8%;
    height: 100vh;
    white-space: nowrap;

	}
 
  
  .gk-content{
     padding: 1rem 3.2rem; 
     color:white;  
     font-size:0.3rem;
     text-align: left;
     text-indent: 2em;

  }
.hovertree-container{border:0px solid red;}
.container{background-color:white}
a{color:red;}


	.caseItem img {
		width: 100%;
		height: 90%;
    bottom: 0;
    z-index:20;
   -webkit-transition:all .5s ease;
   transition: all .5s ease;
  

	}
  .caseItem:hover .caseItem img{
  bottom: 80px;
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
    animation-name: rotate2;
    animation-duration: 15s;
    /* animation: rotate2 3s linear 0s infinite ; */
	}
  video:hover{ 
   animation-play-state:'paused'
}
@keyframes rotate2{
0% { margin-left:800px; }
20% { margin-left:-800px; }
35% { margin-left:0px; }
100% { margin-left:0px; }
}

.homeCase {
  width: 100%;
  height: 100vh; 
  display:flex;
}
h3.titbg {
  	color: #ffffff;
    padding: 0 8%;
    font-weight: 100;
    text-align: center;
    font-size: 1.875rem;
    background-color: #000000;
    height: 100vh;   
    width: 18%;
    text-align: center;
    align-items: center;
    display: flex;    
    box-sizing: border-box;
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
    width: 11%;
    height: 5rem;
    padding: 1px 8px;
    /* background-color: rgba(77,77,77,.1); */
    border-radius: 10px;
    border: 1px solid hsla(0,0%,100%,.1);
    display: flex;
    justify-content: center;
    align-items: center;
}
.partnerBox span img {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.wrapper{
  display: flex;
  justify-content: space-between;
  background-color: #FFFFFF;
  width:100%;
  min-height: 100vh;
  align-items: center;
  
}
.wrappers{
    background-color: rgb(255 255 255 / 50%);    
    color: #000000;
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
  max-width: 100%;
	max-height: 100%;
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
.container{
  padding: 0rem;
}
.gallery{      
    white-space: nowrap;   
    font-size: 0;
    min-width: 100%;
    height: 100vh;
    background-color: #000000;
  /* width: 100%;
  max-width: 100%;
  min-height: 100vh;
  background-color: #000000;
  margin: 1rem auto;  
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;  
  -webkit-flex-wrap: wrap;
      -ms-flex-wrap: wrap;
          flex-wrap: wrap;
  
  -webkit-box-pack: center;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center; */
}

.gallery-item{    
   
    width: 35%;   
    height: 100vh;    
    text-align: center;   
    display: inline-block;
    position: relative;
    cursor: pointer;
    overflow: hidden; 
 
}

.gallery-item-image{
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background: lightblue;
  z-index:20;
  -webkit-transition:all .5s ease;
  transition: all .5s ease;
  bottom:0;
  overflow: hidden;
}

.gallery-item:hover .gallery-item-image{
  bottom: 150px;
}

.gallery-item-description{
  color:white;
  font-size: 1.2rem;
  width: 100%;
  height: 150px;
  padding: .5rem .8rem;
  background: #1a39d1;
  position: absolute;
  bottom:0;
}
	@media(min-width:1920px){ 
  .gk-content{
    padding: 1rem 3.2rem;
    color: white;
    font-size: 16px;
    text-align: left;
    text-indent: 2em;
    line-height: 35px;
} 
.container-bottom{
    width: 100%;
    height: 30%;
    padding: 25px;
    color: #ffffff;
    background-color: #000000;
}
  } 
</style>
