<template>
	<header :class="{shadow: this.scrollTop >= this.currentHeight}">
		<div class='wrapper'>
			<img class="logo" src="../assets/logo.png">
			<nav>
				<router-link v-for="(route,index) in routes" :to="route.path" :key="index">{{route.name}}</router-link>
			</nav>
		</div>
	</header>
</template>
<script>
let that;
	export default {
		name: 'HeaderPage',
		props: ['isFullpage'],
		data() {
			return {
				scrollTop: 0,
				currentIndex: 0,
        flag:false,
				currentHeight: window.innerHeight,
				routes: [{
						path: '/',
						name: '首页'
					},
					{
						path: '/business',
						name: '产品服务'
					},
					{
						path: '/case',
						name: '案例演示'
					},
					{
						path: '/about',
						name: '关于我们'
					}
				]
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
		}
	},
	mounted() {
		window.addEventListener('mousewheel', this.fullPage);
	}
}
</script>
