<template>
	<div id="modelContainer"></div>
</template>
<script>
	export default {
		name: "EarthPage",
		mounted() {
      Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZjQ4NDIwZS1jMDg5LTQ4NjQtOWY1MS1mMzRjZWNhMGJjOWIiLCJpZCI6OTE0NDYsImlhdCI6MTY1MTcxODUxNn0.BbaE7gmxMnoKzjUHjztR4HIqulxHFrHYzIx-BcsNUMw";
			const viewer = new Cesium.Viewer("modelContainer",{
        // geocoder: false,
				// homeButton: false,
				// sceneModePicker: true,
				// baseLayerPicker: true,
				// navigationHelpButton: false,
				// animation: false,
				// timeline: false,
				// fullscreenButton: false,
				// creditsDisplay: false,
				// vrButton: false,
				//selectionIndicator: false,//关闭绿色框
				//infoBox:false//关闭焦点弹出框
      });
      //关闭logo
      //限制缩放
		 viewer.scene.screenSpaceCameraController.maximumZoomDistance = 2500;
     const tileset = viewer.scene.primitives.add(
     new Cesium.Cesium3DTileset({
	  //  url:'/static/tileset.json',
     url: Cesium.IonResource.fromAssetId(985439)
    

  })
);
      tileset.tileVisible.addEventListener(function(tile) { 

     var content = tile.content;
console.log(content)

       var featuresLength = content.featuresLength; 

      for (var i = 0; i < featuresLength; i++) { 

        let  feature =content.getFeature(i)

      }   

 });

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
		}
	}
</script>
<style scoped>
	#modelContainer {
		width: 100%;
		height: 100vh;
		position: absolute;
	}
</style>
