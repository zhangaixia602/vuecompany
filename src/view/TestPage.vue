<template>
	<header>智慧工厂</header>


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

	var scene,
		labelRenderer,
		DTTween,
		iconObject = [];
	export default {
		name: 'TestPage',
		data() {
			return {
				iconArr: [{
						img: '/static/models/lc/水表.png',
						position: [-400, 40, -300],
						scale: 75,
						name: '水表',
						data: {
							type: '水表',
							id: 'LJFDSFJNNF',
							name: '水表25',
							place: '大厦门口',
							state: '异常状态',
							position: [-400, 10, -300],
							scale: 1.2
						}
					}, {
						img: '/static/models/lc/摄像头.png',
						position: [-350, 40, 100],
						scale: 75,
						name: '摄像头',
						data: {
							type: '摄像头',
							id: 'LJFDSFJNNF',
							name: '摄像头25',
							place: '大厦门口',
							state: '异常状态',
							position: [-350, 10, 100],
							scale: 1.2
						}
					}, {
						img: '/static/models/lc/电表.png',
						position: [0, 50, -300],
						scale: 75,
						name: '电表',
						data: {
							type: '电表',
							id: 'LJFDSFJNNF',
							name: '电表25',
							place: '大厦门口',
							state: '异常状态',
							position: [0, 20, -300],
							scale: 1.2
						}
					},
					{
						img: '/static/models/lc/燃气表.png',
						position: [-764.8282959749986, 670, 300.3706885251563],
						scale: 75,
						name: '燃气表',
						data: {
							type: '燃气表',
							id: 'LJFDSFJNNF',
							name: '燃气表25',
							place: '大厦门口',
							state: '异常状态',
							position: [-764.8282959749986, 520, 300.3706885251563],
							scale: 1.2
						}
					},
					{
						img: '/static/models/lc/门禁.png',
						position: [412.2413402072451, 200, -91.7230799691105],
						scale: 75,
						name: '门禁',
						data: {
							type: '门禁',
							id: 'LJFDSFJNNF',
							name: '门禁26',
							place: '大厦门口',
							state: '正常',
							position: [412.2413402072451, 50, -91.7230799691105],
							scale: 1.2
						}
					},
					{
						img: '/static/models/lc/烟感.png',
						position: [213.7778211322986, 70, 77.8222650879916],
						scale: 75,
						name: '烟感',
						data: {
							type: '烟感',
							id: 'LJFDSFJNNF',
							name: '烟感26',
							place: '大厦门口',
							state: '正常',
							position: [213.7778211322986, 20, 77.8222650879916],
							scale: 1.2
						}
					},
					{
						img: '/static/models/lc/温感.png',
						position: [-130.71775687414453, 90, -724.6109557548291],
						scale: 75,
						name: '温感',
						data: {
							type: '温感',
							id: 'LJFDSFJNNF',
							name: '温感25',
							place: '大厦门口',
							state: '异常状态',
							position: [-130.71775687414453, 40, -724.6109557548291],
							scale: 1.2
						}
					}
				]
			}
		},
		methods: {
			initThree() {
				let width = window.innerWidth //窗口宽
				let height = window.innerHeight
				this.renderer = new THREE.WebGL1Renderer({
					antialias: true
				})
				this.renderer.setSize(width, height);
				document.body.appendChild(this.renderer.domElement);
				//CSS3D render
				labelRenderer = new CSS3DRenderer();
				labelRenderer.setSize(width, height);
				labelRenderer.domElement.id = 'CSS3D';
				labelRenderer.domElement.style.position = 'absolute';
				labelRenderer.domElement.style.top = 0;
				labelRenderer.domElement.style.zIndex = 100;
				labelRenderer.domElement.style.pointerEvents = 'none';
				document.body.appendChild(labelRenderer.domElement)
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
				//加载模型
				let objLoader = new GLTFLoader();
				let dracoLoader = new DRACOLoader();
				dracoLoader.setDecoderPath('/draco/');
				dracoLoader.preload();
				objLoader.setDRACOLoader(dracoLoader);
				objLoader.load('/static/models/smartfactory-processed.glb', function(glb) {
					// glb.scene.position.set(-1000, -600,-1200);
					glb.scene.scale.set(9, 8, 10);
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
					sprite.scale.set(item.scale, item.scale, 1)
					sprite.name = item.name;
					sprite.index = index;
					sprite.type = 'Icon';
					sprite.userData.hover = true;
					iconObject.push(sprite)
					scene.add(sprite)
					this.CSS3DAdd(index, item.data);
					console.log(scene)
				})
				this.renderer.domElement.addEventListener('click', this.onMouseclick);
			},
			// onMouseclick(event){
			// 	event.preventDefault();
			// 	let mainCanvas=event.path[0];
			// 	let rayCaster = new THREE.Raycaster();
			// 	let mouse = new THREE.Vector2();
			// 	mouse.x = (event.clientX / window.innerWidth) *
			// 		2 - 1;
			// 	mouse.y = (event.clientY / window.innerWidth) *
			// 		2 + 1;
			// 	rayCaster.setFromCamera(mouse, this.camera);
			// 	let intersects = rayCaster.intersectObjects(scene.children, true);
			// 	if(intersects.length>0){
			// 		console.log(intersects)
			// 	}
			// },
			onMouseclick(event) {
				event.preventDefault();
				let mouse = new THREE.Vector2();
				mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
				mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
				//新建一个三维单位向量 假设z方向就是0.5
				//根据照相机，把这个向量转换到视点坐标系
				var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(this.camera);

				//在视点坐标系中形成射线,射线的起点向量是照相机， 射线的方向向量是照相机到点击的点，这个向量应该归一标准化。
				var raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());

				//射线和模型求交，选中一系列直线
				var intersects = raycaster.intersectObjects(scene.children, true);
				console.log('imtersrcts=' + intersects)
			},
			CSS3DAdd(i, data) {
				let divDom = document.createElement('div')
				divDom.setAttribute('id', `THREE3D_plant${i}`)
				divDom.innerHTML = `<div class='plant3D' ${data.type == '摄像头' ? `style='display:inline-block'` : ``}>
			             <div class='plant3DTitle'>${data.type}信息</div>
			             <div class='plant3Dcontent'>
			               <p style='margin:10px 0 0 10px'>设备ID: ${data.id}</p>
			               <p>设备名称: ${data.name}</p>
			               <p>设备位置: ${data.place}</p>
			               <p>设备状态: <span ${data.state == '异常状态' ? `style='color:red'` : `style='color:green'`}>${data.state}</span></p>
			             </div>
			           </div>`
				let cardCSS3DObject = new CSS3DObject(divDom);
				cardCSS3DObject.position.set(data.position[0], data.position[1], data.position[2])
				cardCSS3DObject.scale.set(data.scale, data.scale, 1);
				cardCSS3DObject.visible = false;
				cardCSS3DObject.name = data.name;
				scene.add(cardCSS3DObject)
			},
			setEnvMap(hdr) {
				new RGBELoader().setPath("/static/gltf/").load(hdr + ".hdr", (texture) => {
					texture.mapping = THREE.EquirectangularReflectionMapping;
					scene.environment = texture;
				})
			},
			animate() {
				requestAnimationFrame(this.animate)
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
		width: 100%;
		height: 100vh;
		margin: 0;
		padding: 0;
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
