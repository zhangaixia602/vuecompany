<template>
  <div id="factory"></div>
</template>
<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
let scene=null;
export default {
  name: 'FactoryPage',
  methods: {
    initThree () {
      let threeLoader = document.getElementById('factory')
      let width = window.innerWidth //窗口宽
      let height = window.innerHeight
      this.renderer = new THREE.WebGL1Renderer({antialias: true})
      this.renderer.setSize(width, height)
      threeLoader.appendChild(this.renderer.domElement)
      
      scene = new THREE.Scene()
      let cubeTextureLoader = new THREE.CubeTextureLoader();
			cubeTextureLoader.setPath( '/static/models/lc/' );

			let textureCube = cubeTextureLoader.load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] );
			textureCube.encoding = THREE.sRGBEncoding;
      scene.background = textureCube;
      this.setEnvMap("004");
      
      this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000)
      this.camera.position.set(0, 0, 400)
      this.camera.lookAt(scene.position)
      let light = new THREE.HemisphereLight(0xbbbbff, 0x444422, 1.5)
      light.position.set(0, 1, 0)
      scene.add(light)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      let objLoader = new GLTFLoader()
      objLoader.load('/static/models/lc.gltf', function(glb) {
        scene.add(glb.scene);
      })
    },
    setEnvMap(hdr) {
    new RGBELoader().setPath("/static/gltf/").load(hdr + ".hdr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      this.scene.background = texture;
      this.scene.environment = texture;
    });
  },
    animate () {
      requestAnimationFrame(this.animate)
      this.renderer.render(scene, this.camera)
    }
  },
  mounted () {
    this.initThree()
    this.animate()
  }
}
</script>
