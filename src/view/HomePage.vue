<template>
  <swiper
    :direction="'vertical'"
    :slidesPerView="1"
    :spaceBetween="30"
    :mousewheel="true"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide>Slide 1</swiper-slide><swiper-slide>Slide 2</swiper-slide
    ><swiper-slide>Slide 3</swiper-slide><swiper-slide>Slide 4</swiper-slide
    ><swiper-slide>Slide 5</swiper-slide><swiper-slide>Slide 6</swiper-slide
    ><swiper-slide>Slide 7</swiper-slide><swiper-slide>Slide 8</swiper-slide
    ><swiper-slide>Slide 9</swiper-slide>
  </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper";
export default {
	 name: "HomePage",
  components: {
    Swiper,
    SwiperSlide,
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
	  background:#fff;
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

</style>
