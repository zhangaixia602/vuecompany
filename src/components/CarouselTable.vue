<template>
	<div class='CarouselTable'>
        <h2 class='titleBg' :style="{ display: this.title!=='' ? 'block' : 'none' }">{{this.title}}</h2>
        <div class='table-carousel'>
           <ul class='header-table-carousel'>
                <li>
                    <div  v-for="(column,index) in columns" :style="{width:column.width+'px'}" :key="index">{{column.title}}</div>
                </li>
           </ul>
           <div class='body-table-carousel-container' :style="{ height: this.title!=='' ? '5.5rem' : '7.5rem' }">
                <ul class='body-table-carousel ' :class="{goCarousel:this.title!=='',goCarousel1:this.title==''}">
                    <li  v-for="(sources,index) in sources" :key='index'>
                        <div  v-for="(column,i) in columns" :style="{width:column.width+'px'}" :key="i">{{sources[column.dataIndex]}}</div>
                    </li>
                </ul>
           </div>
        </div>
    </div>
</template>
<script>
	export default {
		name: 'CarouselTable',
		props: ['options'],
		data() {
			return {
				columns: this.options.viewData || [],
				sources: this.options.data || [],
                title:this.options.title || ""
			}
		},
		methods: {
		},
		mounted() {
		}
	}
</script>
<style scoped>
.CarouselTable{
    padding:0 0.5rem;
    height:100%;
    background:'rgba(4,103,247,0.2)';
}
.table-carousel div{
    display:inline-block;
    font-size:0.7rem;
    color:white;
    text-align: center;
}
.body-table-carousel-container{
    overflow: hidden;
}
.goCarousel{
    animation:goCarousel 10s infinite;
    animation-timing-function:linear;
	animation-direction:normal;
	-webkit-animation:goCarousel 10s infinite;
	-webkit-animation-direction:normal;
    -webkit-animation-timing-function:linear;
}
@keyframes goCarousel {
    from{
        transform:translateY(0);
        -webkit-transform:translateY(0);
        -ms-transform:translateY(0);
        -o-transform:translateY(0);
    }
    to{
        transform:translateY(calc(5.5rem - 100%));
        -webkit-transform:translateY(calc(5.5rem - 100%));
        -ms-transform:translateY(calc(5.5rem - 100%));
        -o-transform:translateY(calc(5.5rem - 100%));
    }
}
.goCarousel1{
    animation:goCarousel1 10s infinite;
    animation-timing-function:linear;
	animation-direction:normal;
	-webkit-animation:goCarousel1 10s infinite;
	-webkit-animation-direction:normal;
    -webkit-animation-timing-function:linear;
}
@keyframes goCarousel1 {
    from{
        transform:translateY(0);
        -webkit-transform:translateY(0);
        -ms-transform:translateY(0);
        -o-transform:translateY(0);
    }
    to{
        transform:translateY(calc(7.5rem - 100%));
        -webkit-transform:translateY(calc(7.5rem - 100%));
        -ms-transform:translateY(calc(7.5rem - 100%));
        -o-transform:translateY(calc(7.5rem - 100%));
    }
}
</style>
