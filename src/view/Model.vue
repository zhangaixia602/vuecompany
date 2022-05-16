<template>
	<div id="WebGL-output">
	</div>
</template>
<script>
	import * as THREE from "three";
	import {
		OrbitControls
	} from 'three/examples/jsm/controls/OrbitControls';
	import {
		CSS3DRenderer,
		CSS3DObject
	} from 'three/examples/jsm/renderers/CSS3DRenderer';
	let scene, orbitControls, camera, renderer, labelRenderer;
	let frustumSize = 500;
	let cameraPos = new THREE.Vector3(200, 250, 500);
	let css3DObject;
	let sources = [{
			text: 'card01',
			color: 'red',
			x: 0,
			y: 0,
			z: 0
		},
		{
			text: 'card02',
			color: 'blue',
			x:680,
			y:580,
			z: 0
		},
		{
			text: 'card03',
			color: 'pink',
			x: 0,
			y: 180,
			z: 0
		},
		{
			text: 'card04',
			color: 'yellow',
			x: 0,
			y: 0,
			z: 180
		}
	]
	export default {
		name: 'FactoryPage',
		methods: {
			initScene() {
				/* 构建场景对象 */
				scene = new THREE.Scene();
				scene.background = new THREE.Color(0x778899); /* 背景色 */

				/* 环境光, 环境光不能用来投射阴影，因为它没有方向 */
				var ambient = new THREE.AmbientLight(0xffffff, 1);
				scene.add(ambient);

				var point = new THREE.PointLight(0x666665);
				point.position.set(220, 330, 300); // 点光源位置
				scene.add(point); // 点光源添加到场景中

				var directionalLight = new THREE.DirectionalLight(0x777777, 0.5);
				scene.add(directionalLight);

				/* 创建一个坐标系 */
				var axisHelper = new THREE.AxesHelper(1000);
				scene.add(axisHelper);

				/* 相机 */
				var aspect = window.innerWidth / window.innerHeight;
				camera = new THREE.OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2,
					frustumSize / -2, 1, 10000);
				camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z); // 设置相机位置
				camera.lookAt(scene.position); // 设置相机方向(指向的场景对象)

				renderer = new THREE.WebGLRenderer();
				renderer.setSize(window.innerWidth, window.innerHeight); // 设置渲染区域尺寸
				document.body.appendChild(renderer.domElement); // body元素中插入canvas对象
				labelRenderer = new CSS3DRenderer();
				labelRenderer.setSize(window.innerWidth, window.innerHeight);
				labelRenderer.domElement.style.position = 'absolute';
				labelRenderer.domElement.style.top = '0px';
				document.body.appendChild(labelRenderer.domElement);

				orbitControls = new OrbitControls(camera, labelRenderer.domElement);
				orbitControls.update();

				this.addCSS3DLabelToScene();
				this.createGeometry();
			},
			render() {
				requestAnimationFrame(this.render);
				orbitControls.update();
				labelRenderer.render(scene, camera);
				renderer.render(scene, camera);
			},
			createGeometry(params = 0) {
				var boxGeometry = new THREE.BoxGeometry(100, 100, 100); // 创建一个正方体几何对象
				var materialBox = new THREE.MeshLambertMaterial({
					color: 0x0000ff,
					opacity: 1,
					transparent: true
				}); // 材质对象Material
				var meshBox = new THREE.Mesh(boxGeometry, materialBox); // 网格模型对象Mesh
				meshBox.position.y = params;
				scene.add(meshBox); // 网格模型添加到场景中，未设定x/y/z坐标，默认位于坐标轴原点

				css3DObject.visible = true;
				css3DObject.position.x = meshBox.position.x - 50 + 18;
				css3DObject.position.y = meshBox.position.y + 50 + 38;
				css3DObject.position.z = meshBox.position.z;
			},
			addCSS3DLabelToScene() {
				var element = document.getElementById("WebGL-output");
				//把生成的CSSDOM对象处理成three的节点对象
				css3DObject = new CSS3DObject(element);
				sources.map((item, index) => {
					let cardContainer = document.createElement('div');
					cardContainer.style.background = item.color;
					cardContainer.innerHTML = item.text;
					cardContainer.className = 'css_style';
					let cardCSS3DObject = new CSS3DObject(cardContainer);
					cardCSS3DObject.rotation.x = item.x;
					cardCSS3DObject.position.y = item.y;
					cardCSS3DObject.position.z = item.z;
					cardCSS3DObject.visible = true;
					css3DObject.add(cardCSS3DObject);
				})
				css3DObject.rotation.x = 0;
				css3DObject.position.y = 0;
				css3DObject.position.z = 0;
				scene.add(css3DObject);
				css3DObject.visible = false;
			}
		},
		mounted() {
			this.initScene();
			this.render();
		}
	}
</script>
<style scoped>
	.css_style {
		background-color: MidnightBlue;
		background-color: rgba(0, 10, 40);
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		opacity: 0.5;
		font-size: 20px;
		color: red;
		padding: 10px 10px 10px;
		white-space: nowrap;
	}

	.css_style:after {
		content: "";
		border-style: solid;
		border-top: 18px solid rgba(0, 10, 40);
		;
		border-right: 8px solid transparent;
		border-bottom: 18px solid transparent;
		border-left: 8px solid transparent;
		/* border-left: 18px solid rgba(0, 10, 40); */
		;
		position: absolute;
		/* left: 100%; */
		top: 100%;
		/* margin-top: 18px; */
		margin-right: 18px;
	}
</style>
