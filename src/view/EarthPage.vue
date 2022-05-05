<template>
	<div id="modelContCesiumainer">Cesium</div>
</template>
<script>
	export default {
		name: "EarthPage",
		mounted() {
			console.log(Cesium)
			//new Cesium.Viewer("modelContainer")
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
