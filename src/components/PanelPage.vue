<template>
	<div class='panelPage'>
        <h2 class='titleBg'>{{this.titleText}}</h2>
        <div class='panelBox textCenter'>
            <div class='panelItem textCenter' v-for="(panel, index) in panels" :key="index">
                <i class="icon iconfont" :class="panel.icon"></i>
                <p>
                    <label>{{panel.label}}</label>
                    <span>{{panel.value}}</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
	export default {
		name: 'PanelPage',
		props: ['options'],
		data() {
			return {
				panels: this.options.data,
                titleText:this.options.title || ""
			}
		}
	}
</script>
<style scoped>
.panelPage{
    padding:0 0.5rem;
    height:100%;
}
.panelBox{
    font-size:0.7rem;
    color:rgb(255, 251, 0);
}
.panelItem .iconfont{
    font-size:1.5rem;
    color:#58fdff;
    margin-right:0.5rem;
}
.panelItem label{
    font-size: 0.9rem;
    text-align: center;
    color:white;
}
</style>
