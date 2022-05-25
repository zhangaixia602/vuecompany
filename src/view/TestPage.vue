<template>
	<header>智慧工厂<button  @click="showNavs()">{{visible}}</button></header>
	<div id="WebGL-output">
	</div>


</template>

<script>
	import * as THREE from "three";
	import {
		GLTFLoader
	} from "three/examples/jsm/loaders/GLTFLoader";
	import {
		OrbitControls
	} from "three/examples/jsm/controls/OrbitControls";
	import {
		DRACOLoader
	} from "three/examples/jsm/loaders/DRACOLoader";
	import {
		RGBELoader
	} from "three/examples/jsm/loaders/RGBELoader";
	import {
		CSS3DRenderer,
		CSS3DObject
	} from "three/examples/jsm/renderers/CSS3DRenderer"

	var scene, orbitControls, labelRenderer;
	let css3DObject;
	let sources = [{
			text: '室内温度:26℃ <br/> 报警信息: 无异常',
			x: -400,
			y: 40,
			z: -300
		},
		{
			text: '室内温度:27℃',
			des: '报警信息: 无异常',
			x: -350,
			y: 40,
			z: 100
		},
		{
			text: '室内温度:25℃',
			des: '报警信息: 无异常',
			x: 0,
			y: 50,
			z: -300
		}
	];

	export default {
		name: 'TestPage',
		data(){
			return {
				visible:false
			}
		},
		methods: {
			showNavs() {
				if(this.visible){
					this.visible=false;
				}else{
					this.visible=true;
				}
			  scene.getObjectByName("精灵").children.map((item)=>{
				  item.visible=this.visible;
			  })
			  this.animate();
			},
			initThree() {
				let width = window.innerWidth //窗口宽
				let height = window.innerHeight
				this.renderer = new THREE.WebGL1Renderer({
					antialias: true
				})
				this.renderer.setSize(width, height)


				scene = new THREE.Scene()
				let cubeTextureLoader = new THREE.CubeTextureLoader();
				cubeTextureLoader.setPath('/static/models/lc/');

				let textureCube = cubeTextureLoader.load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg',
					'nz.jpg'
				]);
				textureCube.encoding = THREE.sRGBEncoding;
				scene.background = textureCube;
				this.setEnvMap("004");

				this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000)
				this.camera.position.set(0, 0, 400)
				this.camera.lookAt(scene.position)
				let light = new THREE.HemisphereLight(0xbbbbff, 0x444422, 1.5)
				light.position.set(0, 50, 0)
				scene.add(light)
				this.controls = new OrbitControls(this.camera, this.renderer.domElement);
				this.controls.maxDistance = 1700;
				this.controls.maxPolarAngle = Math.PI * 0.48;
				document.body.appendChild(this.renderer.domElement);
				labelRenderer = new CSS3DRenderer();
				labelRenderer.setSize(window.innerWidth, window.innerHeight);
				labelRenderer.domElement.style.position = 'absolute';
				labelRenderer.domElement.style.top = '0px';
				document.body.appendChild(labelRenderer.domElement);
				this.addCSS3DLabelToScene();
				let objLoader = new GLTFLoader();
				let dracoLoader = new DRACOLoader();

				css3DObject.visible =false;
				dracoLoader.setDecoderPath('/draco/');
				dracoLoader.preload();
				objLoader.setDRACOLoader(dracoLoader);
				objLoader.load('/static/models/smartfactory-processed.glb', function(glb) {
					// glb.scene.position.set(-1000, -600,-1200);
					glb.scene.scale.set(9, 8, 10);
					glb.scene.rotateY(-80); //绕y轴旋转π/4        
					scene.add(glb.scene);
					css3DObject.position.x = 180;
					css3DObject.position.y = 0;
					css3DObject.position.z = 0;
				})
				orbitControls = new OrbitControls(this.camera, labelRenderer.domElement);
				orbitControls.maxDistance = 1700;
				orbitControls.maxPolarAngle = Math.PI * 0.48;
				orbitControls.update();

				document.body.appendChild(this.renderer.domElement)

			},
			setEnvMap(hdr) {
				new RGBELoader().setPath("/static/gltf/").load(hdr + ".hdr", (texture) => {
					texture.mapping = THREE.EquirectangularReflectionMapping;
					scene.environment = texture;
				})
			},
			modifyDocument(id, color, value) {
				var dom = document.getElementById(id);
				dom.style.color = color;
				dom.textContent = value;
			},
			addCSS3DLabelToScene() {
				var element = document.getElementById("WebGL-output");
				//把生成的CSSDOM对象处理成three的节点对象
				css3DObject = new CSS3DObject(element);
				sources.map((item, index) => {
					let cardContainer = document.createElement('div');
					cardContainer.style =
						" background-color: MidnightBlue;background-color: rgba(0, 10, 40); border-top-left-radius: 10px;border-top-right-radius: 10px;border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;opacity: 0.5;font-size: 1px;color: aqua; padding: 10px 10px 10px;white-space: nowrap;"
					cardContainer.className = "style1";
					document.styleSheets[0].insertRule(
						'.style1::after { content: "";border-style: solid;border-top: 18px solid rgba(0, 10, 40);border-right: 8px solid transparent;border-bottom: 18px solid transparent;border-left: 8px solid transparent;position: absolute;top: 100%;left:50%;top:80%;}',
						0);
					cardContainer.innerHTML = item.text;
					let cardCSS3DObject = new CSS3DObject(cardContainer);
					cardCSS3DObject.position.x = item.x;
					cardCSS3DObject.position.y = item.y;
					cardCSS3DObject.position.z = item.z;
					cardCSS3DObject.visible = false;
					css3DObject.add(cardCSS3DObject);
				})

				//设置CSS3DObject对象
				css3DObject.name='精灵';
				css3DObject.position.x = 0;
				css3DObject.position.y = 0;
				css3DObject.position.z = 0;
				//在第二个场景中添加这个对象
				scene.add(css3DObject);
				// 默认不显示
				css3DObject.visible = false;
			},
			animate() {
				requestAnimationFrame(this.animate)
				orbitControls.update();
				labelRenderer.render(scene, this.camera);
				this.renderer.render(scene, this.camera)
			}
		},
		mounted() {
			this.initThree()
			this.animate()
		}
	};
</script>
<style scoped>
	body {
	    width:100%;
		height:100vh;
		margin:0;
		padding:0;
		overflow: hidden;
	
	}
	header {
		background: url(../assets/tb1.png) no-repeat center center;
		background-size: cover;
		text-align: center;
		color: white;
		font-size: 2rem;
		line-height: 3.5rem;
	}
</style>
