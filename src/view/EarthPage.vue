<template>
	<div id="modelContainer"></div>
	<a-modal v-model:visible="visible" :footer="null" :title="title" @ok="handleOk">
		<p><label>形状</label><value>{{geometry}}</value></p>
		<p><label>颜色</label><value>{{color}}</value></p>
	</a-modal>
</template>
<script>
import { defineComponent, ref } from 'vue';
	export default defineComponent({
		name: "EarthPage",
		data() {
			return {
				visible:false,
				geometry:"",
				title:"",
				color:"",
				pops:[
					{
						id:'Cylinder001',
						name:"圆柱体",
						color:"蓝色"
					},
					{
						id:'Cylinder002',
						name:"圆柱体",
						color:"粉色"
					},
					{
						id:"Cone001",
						name:"圆锥体",
						color:"蓝色"
					},
					{
						id:'Sphere001',
						name:"球体",
						color:"黑色"
					}
				]
			}
		},
		methods: {
			handleOk (){
			  this.visible=false
			}
		},
		mounted() {
			Cesium.Ion.defaultAccessToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZjQ4NDIwZS1jMDg5LTQ4NjQtOWY1MS1mMzRjZWNhMGJjOWIiLCJpZCI6OTE0NDYsImlhdCI6MTY1MTcxODUxNn0.BbaE7gmxMnoKzjUHjztR4HIqulxHFrHYzIx-BcsNUMw";
			const viewer = new Cesium.Viewer("modelContainer", {
				geocoder: false,
				homeButton: false,
				sceneModePicker: true,
				baseLayerPicker: true,
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
			//限制缩放
			viewer.scene.screenSpaceCameraController.maximumZoomDistance = 2500;
			const tileset = viewer.scene.primitives.add(
				new Cesium.Cesium3DTileset({
					// url: '/static/tileset.json',
					url: Cesium.IonResource.fromAssetId(984161),
					skipLevelOfDetail: true,
					baseScreenSpaceError: 1024,
					skipScreenSpaceErrorFactor: 16,
					skipLevels: 1,
					immediatelyLoadDesiredLevelOfDetail: false,
					loadSiblings: false,
					cullWithChildrenBounds: true

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
			let that=this;
			viewer.screenSpaceEventHandler.setInputAction(function(clickEvent) {
				let pickModel = viewer.scene.pick(clickEvent.position);
		
				
          		that.visible=true;
							that.title=pickModel._content._batchTable._properties['name'][pickModel._batchId];
							that.geometry=pickModel._content._batchTable._properties['字段一'][pickModel._batchId];
              that.color=pickModel._content._batchTable._properties['字段二'][pickModel._batchId];

					// that.pops.map((item,index)=>{
					// 	if(item.id===modeId){
					// 		that.visible=true;
					// 		that.title=item.id;
					// 		that.geometry=item.name;
					// 		that.color=item.color;
					// 	}
					// })
				
        console.log(pickModel)
			}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
		}
	})
</script>
<style scoped>
	#modelContainer {
		width: 100%;
		height: 100vh;
		position: absolute;
	}
</style>
