<template>
	<div class='progressBar'>
        <h2 class='titleBg' :style="{ display: this.titleText!=='' ? 'block' : 'none' }">{{this.titleText}}</h2>
        <div class='progressBox'>
            <div class='progressItem' v-for="(progressSource, index) in progressSources" :key="index">
                <h3>{{progressSource.name}}</h3>
                <p><span :style="{ width:(this.initProcessBar(progressSource))+'%' }">{{this.initProcessBar(progressSource)}}%</span></p>
            </div>
        </div>
    </div>
</template>
<script>
	export default {
		name: 'progressBar',
		props: ['options'],
		data() {
			return {
				progressSources: this.options.data,
                titleText:this.options.title || ""
			}
		},
        methods: {
            initProcessBar(progressSource){
                let value=(progressSource.actual/progressSource.standard)*100;
                return value>100 ? 100 : value.toFixed(2)
            }
        }
	}
</script>
<style scoped>
.progressBar{
    padding:0 0.5rem;
    height:100%;
}
.progressBox{
    font-size:0.7rem;
    color:blue;
}
.progressItem h3{
    font-size:0.4rem;
    color:white;
}
.progressItem p{
    width:100%;
    height: 0.6rem;
    background: red;
    border-radius: 0.6rem;
    background:gray;
    position: relative;
}
.progressItem span{
    display:inline-block;
    height:100%;
    background-image: linear-gradient(to right, rgb(0, 255, 21) , yellow);
    border-radius: 0.6rem;
    position: absolute;
    top:0;
    left:0;
    font-size: 0.4rem;
    color: white;
    line-height: 100%;
    text-align: center;
}
</style>
