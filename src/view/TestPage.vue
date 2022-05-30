<template>
	<div class='container'>
		<canvas class="c" ref="ThreeJS"></canvas>
		<div class='popup' id="popup"
			:style="{display: this.visible ? 'block' : 'none',transform: 'matrix(1, 0, 0, 1, '+left+', '+top+')'}">
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
</template>
<script>
	import * as THREE from 'three';
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
	let scene,
		labelRenderer,
		plantArr = [],
		iconObject = [];
	export default {
		name: 'TestPage',
		data() {
			return {
				camera: null,
				cameraPole: null,
				renderer: null,
				canvas: null,
				canvasW: 0,
				canvasH: 0,
				cameraParam: {
					fov: 30,
					aspect: 2,
					near: .1,
					far: 200
				},
				events: {
					raycaster: new THREE.Raycaster(),
					pickedObject: null,
					pickedObjectSavedColor: 0,
					pickPosition: {
						x: 0,
						y: 0
					}
				},
				visible: false,
				left: 0,
				top: 0,
				geometry: "几何体",
				title: "",
				iconArr: [{
						img: '/static/models/lc/水表.png',
						position: [4, 4, 8],
						scale: 75,
						name: '水表',
						data: {
							type: '水表',
							id: 'LJFDSFJNNF',
							name: '水表25',
							place: '大厦门口',
							state: '异常状态',
							position: [4, 0, 8],
							scale: 1.2
						}
					}, {
						img: '/static/models/lc/摄像头.png',
						position: [-5, 4, 8],
						scale: 75,
						name: '摄像头',
						data: {
							type: '摄像头',
							id: 'LJFDSFJNNF',
							name: '摄像头25',
							place: '大厦门口',
							state: '异常状态',
							position: [-5, 0, 8],
							scale: 1.2
						}
					}, {
						img: '/static/models/lc/电表.png',
						position: [0, 4, 10],
						scale: 75,
						name: '电表',
						data: {
							type: '电表',
							id: 'LJFDSFJNNF',
							name: '电表25',
							place: '大厦门口',
							state: '异常状态',
							position: [0, 0, 10],
							scale: 1.2
						}
					},
					{
						img: '/static/models/lc/燃气表.png',
						position: [-7, 4, 14],
						scale: 75,
						name: '燃气表',
						data: {
							type: '燃气表',
							id: 'LJFDSFJNNF',
							name: '燃气表25',
							place: '大厦门口',
							state: '异常状态',
							position: [-7,0, 14],
							scale: 1.2
						}
					},
					{
						img: '/static/models/lc/门禁.png',
						position: [14, 4, -9],
						scale: 75,
						name: '门禁',
						data: {
							type: '门禁',
							id: 'LJFDSFJNNF',
							name: '门禁26',
							place: '大厦门口',
							state: '正常',
							position: [14, 0, -9],
							scale: 1.2
						}
					},
					{
						img: '/static/models/lc/烟感.png',
						position: [11, 4, 7],
						scale: 75,
						name: '烟感',
						data: {
							type: '烟感',
							id: 'LJFDSFJNNF',
							name: '烟感26',
							place: '大厦门口',
							state: '正常',
							position: [11, 0, 7],
							scale: 1.2
						}
					},
					{
						img: '/static/models/lc/温感.png',
						position: [-13, 4, -7],
						scale: 75,
						name: '温感',
						data: {
							type: '温感',
							id: 'LJFDSFJNNF',
							name: '温感25',
							place: '大厦门口',
							state: '异常状态',
							position: [-13, 0, -7],
							scale: 1.2
						}
					}
				],
				source: [{
						name: 'yancong',
						title: '烟囱'
					},
					{
						name: 'guangzi',
						title: '油罐'
					},
					{
						name: 'box_1',
						title: '厂房'
					},
					{
						name: 'wding_1',
						title: '排风房'
					},
					{
						name: 'box_10',
						title: '厂房'
					}
				]
			}
		},
		created() {
			this.canvasW = window.innerWidth;
			this.canvasH = window.innerHeight;
			// 初始化设置宽⾼⽐
			this.cameraParam.aspect = this.canvasW / this.canvasH
		},
		mounted() {
			this.start()
		},
		methods: {
			handleOk() {
				this.visible = false
			},
			start() {
				// 初始化三要素
				this.initMain()
				// 启⽤渲染
				this.render()
			},
			initMain() {
				this.initScene()
				this.initCamera()
				this.initRenderer()
				// 添加环境光
				this.addLight()
				// 添加模型
				this.getModel()
				// 调⽤点击事件
				this.clickEvents()
			},
			initScene() {
				// 创建场景
				scene = new THREE.Scene();
				let cubeTextureLoader = new THREE.CubeTextureLoader();
				cubeTextureLoader.setPath('/static/models/lc/');

				let textureCube = cubeTextureLoader.load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg',
					'nz.jpg'
				]);
				textureCube.encoding = THREE.sRGBEncoding;
				scene.background = textureCube;
				this.setEnvMap("004");
			},
			setEnvMap(hdr) {
				new RGBELoader().setPath("/static/gltf/").load(hdr + ".hdr", (texture) => {
					texture.mapping = THREE.EquirectangularReflectionMapping;
					scene.environment = texture;
				})
			},
			initCamera() {
				// 创建透视摄像头
				const cP = this.cameraParam;
				this.camera = new THREE.PerspectiveCamera(cP.fov, cP.aspect, cP.near, cP.far);
				this.camera.position.z = 30;
				scene.add(this.camera);
			},
			initRenderer() {
				// 渲染器
				this.canvas = this.$refs.ThreeJS;
				this.renderer = new THREE.WebGLRenderer({
					canvas: this.canvas,
					antialias: true, //是否开启反锯齿，设置为true开启反锯齿。
					alpha: true, //是否可以设置背景⾊透明。
					logarithmicDepthBuffer: true //模型的重叠部位便不停的闪烁起来。这便是Z-Fighting问题，为解决这个问题，我们可以采⽤该种⽅法
				})
				labelRenderer = new CSS3DRenderer();
				labelRenderer.setSize(window.innerWidth,window.innerHeight);     
				labelRenderer.domElement.style.position = 'absolute';
				labelRenderer.domElement.style.top = '0px';
				labelRenderer.domElement.style.pointerEvents='none';
				document.body.appendChild(labelRenderer.domElement);
			},
			addLight() {
				// 环境光
				const color = 0xFFFFFF;
				const intensity = 1;
				const light = new THREE.AmbientLight(color, intensity);
				scene.add(light)
			},
			render() {
				// 启动动画
				this.renderer.render(scene, this.camera);
				labelRenderer.render(scene, this.camera);
				// 动态监听窗⼝尺⼨变化
				if (this.resizeRendererToDisplaySize(this.renderer)) {
					const canvas = this.renderer.domElement;
					this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
					this.camera.updateProjectionMatrix();
				}
				requestAnimationFrame(this.render.bind(this))
			},
			resizeRendererToDisplaySize(renderer) {
				const canvas = renderer.domElement;
				this.canvasW = window.innerWidth;
				this.canvasH = window.innerHeight;
				const needResize = canvas.width !== this.canvasW || canvas.height !== this.canvasH;
				if (needResize) {
					this.renderer.setSize(this.canvasW, this.canvasH, false);
					labelRenderer.setSize(this.canvasW, this.canvasH, false);
				}
				return needResize;
			},
			getModel() {
				this.controls = new OrbitControls(this.camera, this.renderer.domElement);
				this.controls.maxDistance = 1700;
				this.controls.maxPolarAngle = Math.PI * 0.48;
				//加载模型
				let objLoader = new GLTFLoader();
				let dracoLoader = new DRACOLoader();
				dracoLoader.setDecoderPath('/draco/');
				dracoLoader.preload();
				objLoader.setDRACOLoader(dracoLoader);
				objLoader.load('/static/models/smartfactory-processed.glb', function(glb) {
					glb.scene.scale.set(0.9, 0.8, 1);
					glb.scene.rotateY(-80); //绕y轴旋转π/4        
					scene.add(glb.scene);
				})
				//加载精灵
				this.iconArr.map((item, index) => {
					let spriteMaterial = new THREE.SpriteMaterial({
						map: new THREE.TextureLoader().load(item.img)
					});
					// 创建精灵模型对象，不需要几何体geometry参数
					let sprite = new THREE.Sprite(spriteMaterial);
					sprite.position.set(item.position[0], item.position[1], item.position[2])
					// sprite.scale.set(item.scale, item.scale, 1)
					sprite.name = item.name;
					sprite.index = index;
					sprite.type = 'Icon';
					iconObject.push(sprite)
					scene.add(sprite)
					this.CSS3DAdd(index, item.data);
				})
			},
			CSS3DAdd(i, data) {
				let divDom = document.createElement('div')
				divDom.setAttribute('id', `THREE3D_plant${i}`)
				divDom.innerHTML = `<div class='plant3D' style='font-size:6px;padding:10px;background:rgba(255,255,255,0.5)' ${data.type == '摄像头' ? `style='display:inline-block'` : ``}>
			             <div class='plant3DTitle'>${data.type}信息</div>
			             <div class='plant3Dcontent'>
			               <p>设备ID: ${data.id}</p>
			               <p>设备名称: ${data.name}</p>
			               <p>设备位置: ${data.place}</p>
			               <p>设备状态: <span ${data.state == '异常状态' ? `style='color:red'` : `style='color:green'`}>${data.state}</span></p>
			             </div>
			           </div>`;
				divDom.style.cursor = "pointer";
				divDom.style.pointerEvents='none';
				let cardCSS3DObject = new CSS3DObject(divDom);
				cardCSS3DObject.position.set(data.position[0], data.position[1], data.position[2])
				cardCSS3DObject.scale.set(0.05, 0.05, 0.05);
				cardCSS3DObject.visible = false;
				cardCSS3DObject.name = data.name;
				plantArr.push(cardCSS3DObject);
				scene.add(cardCSS3DObject)
			},
			clickPickPosition(event) {
				this.pickEvents(this.events.pickPosition, scene, this.camera, obj => {
					obj.userData.checked = !obj.userData.checked;
					if(obj.type==="Icon"){
						plantArr[obj.index].visible =plantArr[obj.index].visible ? false : true;
					}else{
						let index = this.source.findIndex((element) => element.name === obj.name);
						let popup = document.getElementById('popup')
						let width = popup.clientWidth;
						let height = popup.clientHeight;
						if (index >= 0) {
							this.geometry = this.source[index].title;
							this.title = obj.name;
							this.left = event.x - width / 2;
							this.top = event.y - height - 20;
							this.visible = true;
						} else {
							this.visible = false;
						}
					}
				})
			},
			// 获取当前焦点坐标
			setPickPosition(event) {
				const pos = this.getCanvasRelativePosition(event);
				this.events.pickPosition.x = (pos.x / this.canvas.width) * 2 - 1;
				this.events.pickPosition.y = (pos.y / this.canvas.height) * -2 + 1;
				this.pickEvents(this.events.pickPosition, scene, this.camera)
			},
			// 获取当前事件焦点坐标所在位置
			getCanvasRelativePosition(event) {
				const rect = this.canvas.getBoundingClientRect();
				return {
					x: (event.clientX - rect.left) * this.canvas.width / rect.width,
					y: (event.clientY - rect.top) * this.canvas.height / rect.height
				}
			},
			// 添加⿏标划过以及点击事件
			clickEvents() {
				window.addEventListener('click', this.clickPickPosition);
				window.addEventListener('mousemove', this.setPickPosition);
			},
			// 创建点击事件(默认是离摄像头最近的相交)
			pickEvents(normalizedPosition, scene, camera, callback) {
				// 如果存在拾取的对象，则恢复颜⾊
				// if (this.events.pickedObject) {
				// 	this.events.pickedObject.material.emissive.setHex(this.events.pickedObjectSavedColor);
				// 	this.events.pickedObject = undefined;
				// }
				// 沿着摄像头的⽅向投射射线
				this.events.raycaster.setFromCamera(normalizedPosition, camera)
				// 获取与射线光线相交的对象列表
				const intersectedObjects = this.events.raycaster.intersectObjects(scene.children);
				if (intersectedObjects.length) {
					// 获取与射线光纤相交的第⼀个对象。也是最近的⼀个
					this.events.pickedObject = intersectedObjects[0].object;
					// 保存当前对象的颜⾊
					// this.events.pickedObjectSavedColor = this.events.pickedObject.material.emissive.getHex();
					// 将其发射颜⾊设置为闪烁的红⾊/黄⾊
					// this.events.pickedObject.material.emissive.setHex(0xFFFF00)
					if (callback) {
						callback(this.events.pickedObject)
					}
				}
			},
		}
	}
</script>
<style>
	html,
	body {
		height: 100vh;
		margin: 0;
	}

	.container {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.c {
		width: 100%;
		height: 100%;
		display: block;
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
</style>
