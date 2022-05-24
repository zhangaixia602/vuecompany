<template>
	<div class='container'>
		<div id="modelContainer"></div>
		<header>智慧厂区
			<DatePage />
		</header>
		<nav>
			<a v-for='(nav,index) in navs' :key='index' @click="showNav(nav,index)"
				:class="{active: this.currentIndex===index}">{{nav.title}}</a>
		</nav>
		<section class='left'>
			<div class='borderBg energy'
				:style="{ display: this.currentNav==='home' || this.currentNav==='operate' ? 'block' : 'none' }">
				<PanelPage :options="{
		    title:this.panelTitle,
		    data:this.panelData
		  }" />
			</div>
			<div class='borderBg energy' :style="{ display: this.currentNav==='energy' ? 'block' : 'none' }">
				<PanelPage :options="{
			  title:this.energyTitle,
			  data:this.energyData
			}" />
			</div>
			<div class='category borderBg'
				:style="{ display: this.currentNav==='home' || this.currentNav==='energy' ? 'block' : 'none' }">
				<PiePage :options="{
		    domSelector: 'pie',
		    title:this.categoryTitle,
		    data:this.categoryData
		  }" />
			</div>
			<div class='borderBg'
				:style="{ display: this.currentNav==='home' || this.currentNav==='operate' ? 'block' : 'none' }">
				<BarPage :options="{
		    domSelector: 'vehicle',
		    viewData: this.vehicle,
		    smooth:true,
		    data:this.vehicleData,
			boundaryGap:true
		  }" />
			</div>
			<div class='category borderBg' :style="{ display: this.currentNav==='monitor' ? 'block' : 'none' }">
				<PiePage :options="{
			  domSelector: 'monitorPie',
			  title:this.monitorTitle,
			  data:this.monitorData
			}" />
			</div>
			<div class='borderBg' :style="{ display: this.currentNav==='monitor' ? 'block' : 'none' }">
				<BarPage :options="{
			  domSelector: 'alarm',
			  viewData: this.alarm,
			  smooth:true,
			  data:this.alarmData,
						boundaryGap:true
			}" />
			</div>
			<div class='temDity borderBg' :style="{ display:this.currentNav==='operate' ? 'block' : 'none' }">
				<BarPage :options="{
			  domSelector: 'temDity',
			  viewData: this.temDity,
			  smooth:true,
			  data:this.temDityData,
			  config:this.echartsConfig
			}" />
			</div>
			<div class='borderBg' :style="{ display:this.currentNav==='energy' ? 'block' : 'none' }">
				<BarPage :options="{
			  domSelector: 'water',
			  viewData: this.water,
			  smooth:true,
			  data:this.waterData,
			  config:this.echartsConfig
			}" />
			</div>
			<div class='borderBg' :style="{ display: this.currentNav==='environment' ? 'block' : 'none' }">
				<BarPage :options="{
		  domSelector: 'envir',
		  viewData: this.envir,
		  smooth:true,
		  data:this.envirData,
					boundaryGap:true
		}" />
			</div>
			<div class='borderBg' :style="{ display: this.currentNav==='environment' ? 'block' : 'none' }">
				<h3 class='titleBg'>化验室KPI</h3>
				<progressBar :options="{
		      data:this.progressData,
		  }" />
			</div>
		</section>
		<section class='right'>
			<div class='borderBg'
				:style="{ display: this.currentNav==='home' || this.currentNav==='monitor' ? 'block' : 'none' }">
				<CarouselTable :options="{
		      title:this.carouselTitle,
		      viewData: this.columns,
		      data:this.dataSource,
		  }" />
			</div>
			<div class='borderBg'
				:style="{ display: this.currentNav==='home' || this.currentNav==='environment' ? 'block' : 'none' }">
				<BarPage :options="{
			  domSelector: 'design',
			  viewData: this.design,
			  smooth:true,
			  data:this.designData,
						boundaryGap:true
			}" />
			</div>
			<div class='bottom borderBg' :style="{ display:this.currentNav==='monitor' ? 'flex' : 'none' }">
				<img :src="require('../assets/monitor.png')" />
				<img :src="require('../assets/monitor01.png')" />
				<img :src="require('../assets/monitor.png')" />
				<img :src="require('../assets/monitor01.png')" />
			</div>
			<div class='borderBg' :style="{ display:this.currentNav==='energy' ? 'block' : 'none' }">
				<BarPage :options="{
			  domSelector: 'electric',
			  viewData: this.electric,
			  smooth:true,
			  data:this.electricData
			}" />
			</div>
			<div class='borderBg' :style="{ display:this.currentNav==='energy' ? 'block' : 'none' }">
				<BarPage :options="{
			  domSelector: 'natural',
			  viewData: this.natural,
			  smooth:true,
			  data:this.naturalData
			}" />
			</div>
		</section>
		<div class='popupBox' :style="{ display: this.visible ? 'block' : 'none'}">
			<div class='popup' id="popup" :style="{transform: 'matrix(1, 0, 0, 1, '+left+', '+top+')'}">
				<span class='popup-close-button' @click="handleOk">x</span>
				<div class='popup-content'>
					<h3>{{title}}</h3>
					<p><label>名称</label>
						<value>{{geometry}}</value>
					</p>
				</div>
				<div class='popup-tip-container'></div>
			</div>
		</div>
	</div>
</template>
<script>
	import * as echarts from "echarts";
	import {
		defineComponent,
		ref
	} from 'vue';
	import BarPage from '@/components/BarPage';
	import PiePage from '@/components/PiePage';
	import PanelPage from '@/components/PanelPage';
	import CarouselTable from '@/components/CarouselTable';
	import DatePage from '@/components/DatePage';
	import progressBar from '@/components/progressBar';
	export default defineComponent({
		name: "EarthPage",
		components: {
			'BarPage': BarPage,
			'PiePage': PiePage,
			'PanelPage': PanelPage,
			'CarouselTable': CarouselTable,
			'DatePage': DatePage,
			'progressBar': progressBar
		},
		data() {
			return {
				navs: [{
						id: 'home',
						title: '首页'
					},
					{
						id: 'monitor',
						title: '安全监视'
					},
					{
						id: 'energy',
						title: '能耗监控',
					},
					{
						id: 'operate',
						title: '数字运维',
					},
					{
						id: 'environment',
						title: '环保监管',
					}
				],
				currentIndex: 0,
				currentNav: 'home',
				carouselTitle: '实时报警情况',
				dataSource: Array(24).fill(1).map(function(item, index) {
					return {
						key: "id" + index,
						name: '超限报警',
						age: index % 2 === 0 ? '一级报警' : '二级报警',
						remark: '未解决'
					}
				}),
				columns: [{
						title: '名称',
						width: 80,
						dataIndex: 'name',
						key: 'name'
					},
					{
						title: '报警类别',
						width: 80,
						dataIndex: 'age',
						key: 'age'
					},
					{
						title: '报警描述',
						width: 80,
						dataIndex: 'remark',
						key: 'remark'
					}
				],
				categoryTitle: "主要能源消耗",
				categoryData: [{
						name: "电",
						value: parseInt(Math.random() * 100 + 1000)
					},
					{
						name: "水",
						value: parseInt(Math.random() * 100 + 800)
					},
					{
						name: "天然气",
						value: parseInt(Math.random() * 100 + 600)
					}
				],
				monitorTitle: "报警类型",
				monitorData: [{
						name: "一级",
						value: parseInt(Math.random() * 100 + 1000)
					},
					{
						name: "二级",
						value: parseInt(Math.random() * 100 + 800)
					},
					{
						name: "三级",
						value: parseInt(Math.random() * 100 + 600)
					}
				],
				temDity: {
					title: "维修工单对比",
					xAxis: Array(7).fill(1).map(function(item, index) {
						return index
					}),
					legend: [{
						name: "本周",
						key: "tempe"
					}, {
						name: "上周",
						key: "dity"
					}]
				},
				temDityData: [{
						key: "tempe",
						type: "line",
						data: Array(24).fill(1).map(function() {
							return parseInt(Math.random() * 20 + 20)
						})
					},
					{
						key: "dity",
						type: "line",
						data: Array(24).fill(1).map(function() {
							return parseInt(Math.random() * 30 + 30)
						})
					}
				],
				water: {
					title: "水耗检测",
					xAxis: Array(7).fill(1).map(function(item, index) {
						return index
					})
				},
				waterData: [{
					key: "tempe",
					type: "line",
					data: Array(24).fill(1).map(function() {
						return parseInt(Math.random() * 20 + 20)
					})
				}],
				electric: {
					title: "电耗检测",
					xAxis: Array(7).fill(1).map(function(item, index) {
						return index
					})
				},
				electricData: [{
					key: "tempe",
					type: "line",
					data: Array(24).fill(1).map(function() {
						return parseInt(Math.random() * 20 + 200)
					})
				}],
				natural: {
					title: "天然气检测",
					xAxis: Array(7).fill(1).map(function(item, index) {
						return index
					})
				},
				naturalData: [{
					key: "tempe",
					type: "line",
					data: Array(24).fill(1).map(function() {
						return parseInt(Math.random() * 20 + 200)
					})
				}],
				vehicle: {
					title: "巡检工单对比",
					xAxis: Array(7).fill(1).map(function(item, index) {
						return index++
					}),
					legend: [{
						name: "上周",
						key: "tempe"
					}, {
						name: "本周",
						key: "dity"
					}]
				},
				vehicleData: [{
						key: "tempe",
						type: "bar",
						data: Array(7).fill(1).map(function() {
							return parseInt(Math.random() * 20 + 20)
						})
					},
					{
						key: "dity",
						type: "bar",
						data: Array(7).fill(1).map(function() {
							return parseInt(Math.random() * 30 + 30)
						})
					}
				],
				alarm: {
					title: "报警对比",
					xAxis: Array(7).fill(1).map(function(item, index) {
						return index++
					}),
					legend: [{
						name: "上周",
						key: "tempe"
					}, {
						name: "本周",
						key: "dity"
					}]
				},
				alarmData: [{
						key: "tempe",
						type: "bar",
						data: Array(7).fill(1).map(function() {
							return parseInt(Math.random() * 20 + 20)
						})
					},
					{
						key: "dity",
						type: "bar",
						data: Array(7).fill(1).map(function() {
							return parseInt(Math.random() * 30 + 30)
						})
					}
				],
				envir: {
					title: "废水日处理量",
					xAxis: ['酸碱', '染色', '含磷', '含镍']
				},
				envirData: [{
					key: "dity",
					type: "bar",
					data: [824, 631, 473, 202]
				}],
				design: {
					title: "设计处理量(h)",
					xAxis: ['酸碱', '染色', '含磷', '含镍']
				},
				designData: [{
					key: "dity",
					type: "bar",
					data: [40, 30, 25, 10]
				}],
				panelTitle: '设备状况统计',
				panelData: [{
						icon: 'icon-zhihuiyuanqu',
						label: '健康',
						value: parseInt(Math.random() * 1000)
					},
					{
						icon: 'icon-zhihuiyuanqu',
						label: '异常',
						value: parseInt(Math.random() * 1000)
					},
					{
						icon: 'icon-zhihuiyuanqu',
						label: '维护中',
						value: parseInt(Math.random() * 1000)
					}
				],
				energyTitle: '当天能耗',
				energyData: [{
						icon: 'icon-zhihuiyuanqu',
						label: '电耗',
						value: parseInt(Math.random() * 1000)
					},
					{
						icon: 'icon-zhihuiyuanqu',
						label: '水耗',
						value: parseInt(Math.random() * 1000)
					},
					{
						icon: 'icon-zhihuiyuanqu',
						label: '气耗',
						value: parseInt(Math.random() * 1000)
					}
				],
				progressData: Array(4).fill(1).map(function(item, index) {
					return {
						key: "id" + index,
						name: index % 2 === 0 ? '出厂水' : '回收水',
						actual: parseInt(Math.random() * 200),
						standard: parseInt(Math.random() * 310)
					}
				}),
				visible: false,
				left: 0,
				top: 0,
				geometry: "几何体",
				title: ""
			}
		},
		methods: {
			showNav(nav, index) {
				console.log(index)
				this.currentNav = nav.id
				this.currentIndex = index
			},
			handleOk() {
				this.visible = false
			},
			echartsConfig(options) {
				options.color = ['#FFBF00', '#80FFA5'];
				options.series[0].lineStyle = {
					width: 0
				};
				options.series[0].showSymbol = false;
				options.series[0].areaStyle = {
					opacity: 0.8,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgb(255, 191, 0)'
						},
						{
							offset: 1,
							color: 'rgb(224, 62, 76)'
						}
					])
				};
				return options;
			}
		},
		mounted() {
			Cesium.Ion.defaultAccessToken =
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZjQ4NDIwZS1jMDg5LTQ4NjQtOWY1MS1mMzRjZWNhMGJjOWIiLCJpZCI6OTE0NDYsImlhdCI6MTY1MTcxODUxNn0.BbaE7gmxMnoKzjUHjztR4HIqulxHFrHYzIx-BcsNUMw";
			const viewer = new Cesium.Viewer("modelContainer", {
				geocoder: false,
				homeButton: false,
				sceneModePicker: false,
				baseLayerPicker: false,
				navigationHelpButton: false,
				animation: false,
				timeline: false,
				fullscreenButton: false,
				creditsDisplay: false,
				vrButton: false,
				//selectionIndicator: false,//关闭绿色框
				//infoBox:false//关闭焦点弹出框
			});
			//关闭logo
			viewer._cesiumWidget._creditContainer.style.display = "none";
			// viewer.scene.globe.show = false; //不显示地球，这条和地球透明度选一个就可以
			// viewer.scene.globe.baseColor = new Cesium.Color(0, 0, 0, 0);
			// viewer.scene.backgroundcolor = new Cesium.Color(0, 0, 0, 0);
			const tileset = viewer.scene.primitives.add(
				new Cesium.Cesium3DTileset({
					url: '/static/tileset.json',
					//url: Cesium.IonResource.fromAssetId(984161),
					skipLevelOfDetail: true,
					baseScreenSpaceError: 1024,
					skipScreenSpaceErrorFactor: 16,
					skipLevels: 1,
					immediatelyLoadDesiredLevelOfDetail: false,
					loadSiblings: false,
					cullWithChildrenBounds: true,
					maximumScreenSpaceError: 2, //最大的屏幕空间误差
					maximumNumberOfLoadedTiles: 1000, //最大加载瓦片个数

				})
			);
			(async () => {
				try {
					await tileset.readyPromise;
					await viewer.zoomTo(tileset);

					// Apply the default style if it exists
					var extras = tileset.asset.extras;
					if (
						Cesium.defined(extras) &&
						Cesium.defined(extras.ion) &&
						Cesium.defined(extras.ion.defaultStyle)
					) {
						tileset.style = new Cesium.Cesium3DTileStyle(extras.ion.defaultStyle);
					}
				} catch (error) {
					console.log(error);
				}
			})();
			//限制缩放
			//viewer.scene.screenSpaceCameraController.maximumZoomDistance = 500;
			tileset.readyPromise.then(function(tileset) {
				var params = {
					tx: 121, //模型中心X轴坐标（经度，单位：十进制度）
					ty: 32, //模型中心Y轴坐标（纬度，单位：十进制度）
					tz: 50, //模型中心Z轴坐标（高程，单位：米）
					rx: 0, //X轴（经度）方向旋转角度（单位：度）
					ry: 0, //Y轴（纬度）方向旋转角度（单位：度）
					rz: 0 //Z轴（高程）方向旋转角度（单位：度）
				};
				//旋转
				var mx = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(params.rx));
				var my = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(params.ry));
				var mz = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(params.rz));
				var rotationX = Cesium.Matrix4.fromRotationTranslation(mx);
				var rotationY = Cesium.Matrix4.fromRotationTranslation(my);
				var rotationZ = Cesium.Matrix4.fromRotationTranslation(mz);
				//平移
				var position = Cesium.Cartesian3.fromDegrees(params.tx, params.ty, params.tz);
				var m = Cesium.Transforms.eastNorthUpToFixedFrame(position);
				//旋转、平移矩阵相乘
				Cesium.Matrix4.multiply(m, rotationX, m);
				Cesium.Matrix4.multiply(m, rotationY, m);
				Cesium.Matrix4.multiply(m, rotationZ, m);
				//赋值给tileset
				tileset._root.transform = m;
				var scale = Cesium.Matrix4.fromUniformScale(6)
				Cesium.Matrix4.multiply(m, scale, m);
				var originalSphere = tileset.boundingSphere;

				var radius = originalSphere.radius;

				viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0.5, -0.5, radius * 4.0));
			});
			let that = this;
			viewer.screenSpaceEventHandler.setInputAction(function(clickEvent) {
				let pickModel = viewer.scene.pick(clickEvent.position);
				let popup = document.getElementById('popup')
				let width = popup.clientWidth;
				let height = popup.clientHeight;
				if (pickModel._batchId) {
					that.left = clickEvent.position.x - width / 2;
					that.top = clickEvent.position.y - height - 20;
					that.title = pickModel._content._batchTable._properties['name'][pickModel._batchId];
					that.geometry = pickModel._content._batchTable._properties['字段一'][pickModel._batchId];
					if (that.geometry !== null && that.geometry !== "" && that.geometry !== "null") {
						that.visible = true;
					} else {
						that.visible = false;
					}
				}

			}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
			const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
			handler.setInputAction(function(movement) {
				const pickedObject = viewer.scene.pick(movement.endPosition);
				let popup = document.getElementById('popup')
				let width = popup.clientWidth;
				let height = popup.clientHeight;
				if (pickedObject instanceof Cesium.Cesium3DTileFeature) {
					that.left = movement.endPosition.x - width / 2;
					that.top = movement.endPosition.y - height - 20;
					that.title = pickedObject._content._batchTable._properties['name'][pickedObject
						._batchId
					];
					that.geometry = pickedObject._content._batchTable._properties['字段一'][pickedObject
						._batchId
					];
					if (that.geometry !== null && that.geometry !== "" && that.geometry !== "null") {
						that.visible = true;
					} else {
						that.visible = false;
					}
				} else {
					that.visible = false;
				}
			}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
		}
	})
</script>
<style scoped>
	body {
		overflow: hidden;
	}

	.container {
		position: relative;
		width: 100%;
		height: 100vh;
		overflow: hidden;
	}

	#modelContainer {
		width: 100%;
		height: 100vh;
		position: relative;
	}

	.popup {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10000000;
		transform-origin: left bottom 0px;
		pointer-events: none;
	}

	.popup-content {
		background-color: rgba(41, 84, 141, 0.9);
		box-shadow: 0 3px 14px rgb(0 0 0 / 40%);
		padding: 0.6rem;
		text-align: left;
		border-radius: 3px;
		line-height: 1.4;
		font-size: 0.7rem;
		max-width: 35rem;
		min-width: 2.5rem;
		max-height: 40rem;
		overflow-y: auto;
		color: white;
	}

	.popup-content h3 {
		font-size: 1rem;
		color: white;
		margin: 0.2rem 0 0.5rem;
	}

	.popup-content label::after {
		content: " :";
		margin-right: 0.5rem;
	}

	.popup-close-button {
		position: absolute;
		top: 0;
		right: 0;
		padding: 4px 4px 0 0;
		text-align: center;
		width: 1rem;
		height: 1rem;
		font: 0.8rem/0.7rem Tahoma, Verdana, sans-serif;
		text-decoration: none;
		font-weight: bold;
		background: transparent;
		z-index: 20170825;
		cursor: pointer;
		color: white;
	}

	.popup-tip-container {
		display: inline-block;
		width: 0;
		height: 0;
		border-top: 0.9rem solid transparent;
		border-left: 0.9rem solid transparent;
		border-right: 0.9rem solid transparent;
		border-bottom: 0.9rem solid rgba(41, 84, 141, 0.9);
		transform: translateX(-60%) rotate(180deg);
		position: absolute;
		left: 50%;
	}

	header {
		background: url(../assets/hbg.png) no-repeat center center;
		background-size: cover;
		color: white;
		font-size: 1.3rem;
		height: 2.3rem;
		line-height: 2.3rem;
		text-align: center;
	}

	header div {
		position: absolute;
		left: 80%;
		top: -0.6rem;
		font-size: 0.8rem;
	}

	nav {
		position: absolute;
		top: 3rem;
		left: 50%;
		transform: translateX(-50%);
		height:2.3rem;
	}

	nav a {
		display: inline-block;
		cursor: pointer;
		font-size: 0.6rem;
		color: white;
		width: 5.1rem;
		height: 2.3rem;
		text-align: center;
		line-height: 2.3rem;
		background: url(../assets/navG.png) no-repeat center center;
	}

	nav a.active {
		color: #58fdff;
		background: url(../assets/nav.png) no-repeat center center;
	}

	.left,
	.right {
		width: 14rem;
		height: calc(100% - 4rem);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		position: absolute !important;
		top: 4rem;
	}

	.left {
		margin-left: 1rem;
		left: 0;
	}

	.right {
		margin-right: 1rem;
		right: 0;
	}

	.borderBg {
		width: 14rem;
		height: 10rem;
		background: url(../assets/border.png) no-repeat center center;
		background-size: 14rem 10rem;
		overflow: hidden;
	}

	.left .energy {
		width: 14rem;
		height: 5rem;
		background-size: 14rem 5rem;
	}

	.bottom {
		padding: 0.2rem;
		flex-wrap: wrap-reverse;
	}

	.bottom img {
		width: 50%;
	}

	#category,
	#temDity,
	#pie,
	#monitorPie,
	#vehicle,
	#envir,
	#WebGL-outputn,
	#design,
	#alarm,
	#water,
	#electric,
	#natural {
		width: 14rem;
		height: 10rem;
	}
</style>
