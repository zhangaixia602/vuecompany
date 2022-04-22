<template>
	<div :id="domSelector"></div>
</template>
<script>
	import * as echarts from "echarts";
	export default {
		name: 'PiePage',
		props: ['options'],
		data() {
			return {
				domSelector: this.options.domSelector,
				data: this.options.data,
                titleText:this.options.title || ""
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
				const options = {
					backgroundColor:'rgba(4,103,247,0.2)',
					tooltip: {
                        trigger: 'item'
                    },
					legend: {
                        bottom: '1%',
                        left: 'center',
						textStyle:{
							color:"white"
						}
                    },
				};
				const echartsConfig = this.options.config;
				if (this.titleText) {
					let title = {
						text: this.titleText,
						padding: [10, 0, 20, 10],
						left:'center',
						textStyle: {
							color: '#ffffff',
							fontFamily: 'sans-serif',
							fontSize:14
						}
					};
					options.title = title;
				}
				options.textStyle = {
					color: 'white'
				}

				let series = [{
                    type: 'pie',
                    radius: ['20%', '50%'],
					label: {
						alignTo: 'edge',
						formatter: '{b}\n{c}%',
                        minMargin: 5,
                        edgeDistance: 10,
                        lineHeight: 15,
						color: 'white'
                    },
                    data: this.data
                }];
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
