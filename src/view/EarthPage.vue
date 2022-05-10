<template>
	<div class='container'>
		<div id="modelContainer"></div>
<!-- 		<div class='popup' :style="{ display: this.visible ? 'block' : 'none',transform: 'matrix(1, 0, 0, 1, '+left+', '+top+')','transform-origin': 'left bottom 0px'}"> -->
        <div class='popup' id="popup" :style="{ display: this.visible ? 'block' : 'none',left:left+'px',top:top+'px'}">
			<span class='popup-close-button' @click="handleOk">x</span>
			<div class='popup-content'>
				<h3>{{title}}</h3>
				<p><label>形状</label>
					<value>{{geometry}}</value>
				</p>
				<p><label>颜色</label>
					<value>{{color}}</value>
				</p>
			</div>
			<div class='popup-tip-container'></div>
		</div>
	</div>
</template>
<script>
	import {
		defineComponent,
		ref
	} from 'vue';
	export default defineComponent({
		name: "EarthPage",
		data() {
			return {
				visible: false,
				left:0,
				top:0,
				geometry: "几何体",
				title: "",
				color: "红色"
			}
		},
		methods: {
			handleOk() {
				this.visible = false
			}
		},
		mounted() {
			Cesium.Ion.defaultAccessToken =
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZjQ4NDIwZS1jMDg5LTQ4NjQtOWY1MS1mMzRjZWNhMGJjOWIiLCJpZCI6OTE0NDYsImlhdCI6MTY1MTcxODUxNn0.BbaE7gmxMnoKzjUHjztR4HIqulxHFrHYzIx-BcsNUMw";
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
			let that = this;
			viewer.screenSpaceEventHandler.setInputAction(function(clickEvent) {
				let pickModel = viewer.scene.pick(clickEvent.position);
				let popup = document.getElementById('popup')
                let width = popup.clientWidth;
                let height = popup.clientHeight;
				if (pickModel._batchId) {
					that.left = clickEvent.position.x-width/2;
					that.top = clickEvent.position.y-height-20;
					that.visible = true;
					that.title = pickModel._content._batchTable._properties['name'][pickModel._batchId];
					that.geometry = pickModel._content._batchTable._properties['字段一'][pickModel._batchId];
					that.color = pickModel._content._batchTable._properties['字段二'][pickModel._batchId];
				}

			}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
		}
	})
</script>
<style scoped>
	.container {
		position: relative;
		width: 100%;
		height: 100vh;
	}

	#modelContainer {
		width: 100%;
		height: 100vh;
		position: absolute;
	}

	.popup {
		position: absolute;
		left: 0;
		top: 0;
		animation-duration: 0.3s;
		animation-fill-mode: both;
		animation-name: popupwashIn;
		z-index: 10000000;
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
		color:white;
	}
	.popup-content h3{
		font-size:1rem;
		color:white;
		margin:0.2rem 0 0.5rem;
	}
    .popup-content label::after{
		content: " :";
		margin-right:0.5rem;
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


	@keyframes popupwashIn {
		0% {
			opacity: 0;
			transform-origin: 50% 50%;
			transform: scale(0, 0);
		}

		90% {
			opacity: 1;
			transform-origin: 50% 50%;
			transform: scale(0.9, 0.9);
		}

		100% {
			opacity: 1;
			transform-origin: 50% 50%;
			transform: scale(1, 1);
		}
	}
</style>
