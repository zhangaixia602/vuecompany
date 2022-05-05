<template>
	<div id="modelContainer"></div>
</template>
<script>
	export default {
		name: "HomePage",
		mounted() {
      console.log(Cesium)
			const viewer = new Cesium.Viewer("modelContainer");

const tileset = viewer.scene.primitives.add(
  new Cesium.Cesium3DTileset({
	  url:'/static/tileset.json',
    //url: Cesium.IonResource.fromAssetId(976768),
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
