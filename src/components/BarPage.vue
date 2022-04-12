<template>
	<div :id="domSelector"></div>
</template>
<script>
	import * as echarts from "echarts";
	export default {
		name: 'BarPage',
		props: ['options'],
		data() {
			return {
				domSelector: this.options.domSelector,
				viewData: this.options.viewData,
				data: this.options.data,
                smooth:this.options.smooth || false
			}
		},
		methods: {
			initChart() {
				const myChart = echarts.init(document.getElementById(this.domSelector));
				const options = this.translateData();
				// 绘制图表
				myChart.setOption(options);
			},
			translateData() {
				const legend = this.viewData.legend || [];
				const titleText = this.viewData.title || "";
				const xAxis = this.viewData.xAxis || [];
				const options = {
					tooltip: {
						trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
				};
				const echartsConfig = this.options.config;
				if (legend.length > 0) {
					let newLegend = legend.map(item => item.name);
					options.legend = {
						x: 'right',
						y: '-15px',
						textStyle: {
							color: '#d5f2fa'
						},
						icon: 'rect',
						padding: [34, 10, 0, 0],
						data: newLegend
					}
				}
				if (titleText) {
					let title = {
						text: titleText,
						padding: [10, 0, 20, 10],
						textStyle: {
							color: '#ffffff',
							fontFamily: 'sans-serif'
						}
					};
					options.title = title;
				}
				if (xAxis) {
					options.xAxis = [{
						type: 'category',
						boundaryGap: false,
						data: xAxis
					}]
				}
				options.yAxis = [{
					type: 'value'
				}]
				options.textStyle = {
					color: 'white'
				}
				options.grid = {
					top: '20%',
					left: '3%',
					right: '10%',
					bottom: '3%',
					containLabel: true
				}

				let series = [];
				if(this.data){
					this.data.map((item)=>{
						const currentItem={
							type:item.type,
							name:legend.length > 0 ? legend.filter(element => element.key === item.key)[0].name : '',
							data:item.data
						}
						if(currentItem.type==="line"){
							currentItem.smooth=this.smooth;
						}
						series.push(currentItem)
					})
				}


				options.series = series;
				if (echartsConfig) {
					return echartsConfig(options);
				} else {
					return options
				}
			}
		},
		mounted() {
			this.initChart()
		}
	}
</script>
<style scoped>
</style>
