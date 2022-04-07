<template>
  <div id="granary"></div>
</template>
<script>
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
let scene=null;
export default {
  name: 'GranaryPage',
  methods: {
    initThree () {
      let threeLoader = document.getElementById('granary')
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

      let light = new THREE.HemisphereLight(0xbbbbff, 0x444422, 1.5)
      light.position.set(0, 1, 0)
      scene.add(light)
      this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000)
      this.camera.position.set(0, 0, 400)
      this.camera.lookAt(scene.position)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      let objLoader = new OBJLoader()
      objLoader.load('/static/models/Squirtle.obj', function(obj) {
        obj.children.map((child,i)=>{
          obj.children[i].material=new THREE.MeshLambertMaterial({
            map:new THREE.TextureLoader().load("/static/models/lc/"+(i===1 ? "Cinder_Block.png" : "Mirror_01.jpg"))
          })
        })
        scene.add(obj);
        scene.scale.set(15,15,15)
      })
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
