<template>
	<HeaderPage :isFullpage="true" />
	<swiper :direction="'vertical'" :slidesPerView="1" :spaceBetween="30" :mousewheel="true" :pagination="{
      clickable: true,
    }" :modules="modules" class="mySwiper">
		<swiper-slide><img src="../assets/banner01.png"> <img class="zt" :src="require('../assets/zt2.png')" />
		</swiper-slide>
		<swiper-slide>
			<div class="container-left">
				<p class="subtitle">公司概要</p>
			</div>
			<div class="container-right">
				<div class="container-top">
					<video autoplay="true" loop>
						<source :src="require('../assets/water.mp4')" type="video/mp4" />
					</video>
				</div>
				<div class="container-bottom">公司简介</div>
			</div>
		</swiper-slide>
		<swiper-slide>
			<div class="container-left">
				<p class="subtitle">核心业务</p>
			</div>
			<div v-for="(menu, index) in menus" :key="index" class="caseItem clear">
				<img :src="require('../' + menu.src)" />
				<h2>
					{{ menu.title }}
				</h2>
				<p>{{ menu.text }}</p>
			</div>
		</swiper-slide>
		<swiper-slide>Slide4</swiper-slide>
		<swiper-slide>Slide5</swiper-slide>
		<swiper-slide>Slide 6</swiper-slide>
		<swiper-slide>Slide 7</swiper-slide>
		<swiper-slide>Slide 8</swiper-slide>
		<swiper-slide>Slide 9</swiper-slide>
	</swiper>
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
						src: "assets/yq.png",
						title: "智慧园区",

					},
					{
						src: "assets/water.png",
						title: "智慧水利",

					},
					{
						src: "assets/ny.png",
						title: "智慧能源",

					},
					{
						src: "assets/lc.png",
						title: "智慧仓库",

					}
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
		height: 100vh;
		line-height: 625px;
		font-size: 3rem;
	}

	.container-left {
		background-color: black;
		width: 18%;
		height: 100%;
		content: "";
		transform: translate3d(0, 0, 0);

	}

	.container-right {

		width: 82%;
		height: 100%
	}

	.container-top {
		width: 100%;
		height: 70%;
	}

	.container-bottom {
		width: 100%;
		height: 30%;
		background-color: #000000;
	}

	.subtitle {
		font-size: 26px;
		line-height: 800px;
		text-align: left;
		color: #dedede;
		padding: 0px 40px;
		letter-spacing: 2px;
		width: 250px;
		font-weight: 100;
		text-align: center;

		vertical-align: middle;
	}

	.caseItem {
		overflow: hidden;
		height: 100vh;
		width: 25%;

	}

	.caseItem div {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		z-index: 99;
	}

	.caseItem img {
		width: auto;
		height: 100vh;

	}

	video {
		height: 100%;
		width: 100%;
		object-fit: fill;
	}
</style>
