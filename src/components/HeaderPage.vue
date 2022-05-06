<template>
	<header :class="{shadow: this.scrollTop >=500}">
		<div class='wrapper'>
			<img class="logo" src="../assets/logo.png">
			<nav>
				<router-link v-for="(route,index) in routes" :to="route.path" :key="index">{{t('header.'+route.id)}}</router-link>
			</nav>
			<a-switch v-model:checked="checked" @change="changeLanguage(checked)" checked-children="中文" un-checked-children="EN" />
		</div>
	</header>
</template>
<script>
import {useI18n} from 'vue-i18n';
import LANGUAGE from '../constants/app';
let that;
	export default {
		name: 'HeaderPage',
		props: ['isFullpage'],
		data() {
			return {
				checked:LANGUAGE==='zh_CN',
				scrollTop: 0,
				currentIndex: 0,
                flag:false,
				routes: [{
						path: '/',
						id: 'home',
						name: '首页'
					},
					{
						path: '/business',
						id: 'business',
						name: '产品服务'
					},
					{
						path: '/case',
						id: 'case',
						name: '案例演示'
					},
					{
						path: '/about',
						id: 'about',
						name: '关于我们'
					},
					{
						path: '/cesium',
						id: 'cesium',
						name: '测试'
					}
				]
			}
		},
    setup() {
		const {t,locale}=useI18n();
		return {
			t,
			locale
		}
	},
    created() {
      that=this;
    },
	methods: {
		fullPage() {
			let event =window.event;
			if(that.isFullpage){
				if(event.wheelDelta>0){
                    this.currentIndex--;
                    if(this.currentIndex<0){
                        this.currentIndex=0;
                    }
				}else{
					this.currentIndex++;
				}
                document.documentElement.scrollTop =this.currentIndex*(this.currentIndex===1 ? (window.innerHeight-100) : window.innerHeight);
				this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            }else{
                this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
			}
		},
		changeLanguage(checked) {
			localStorage.setItem('lang',(checked ? 'zh_CN' : 'en'));
			window.location.reload()
		}
	},
	mounted() {
		window.addEventListener('mousewheel', this.fullPage);
	}
}
</script>
