<template>
  <div id="factory"></div>
</template>
<script>
import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
let scene=null;
export default {
  name: 'FactoryPage',
  methods: {
    handleScroll () {
      this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    },
    initThree () {
      let threeLoader = document.getElementById('factory')
      let width = window.innerWidth //窗口宽
      let height = window.innerHeight
      this.renderer = new THREE.WebGL1Renderer({antialias: true})
      this.renderer.setSize(width, height)
      threeLoader.appendChild(this.renderer.domElement)

      scene = new THREE.Scene()
      scene.background = new THREE.Color(0xeeeeee)

      let light = new THREE.HemisphereLight(0xbbbbff, 0x444422, 1.5)
      light.position.set(0,1, 0)
      scene.add(light)
      this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000)
      this.camera.position.set(0, 0, 400)
      this.camera.lookAt(scene.position)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      let loader = new STLLoader();
          loader.load('/static/models/lc.stl',function (geometry) {
             let material = new THREE.MeshLambertMaterial({
             color: 0xbbbbff,
            }); //材质对象Material
            let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  scene.add(mesh); //网格模型添加到场景中
 
})
      // let objLoader = new OBJLoader()
      // let mtlLoader = new MTLLoader()
      // mtlLoader.load('/static/models/lc.mtl', function(materials) {
      //   objLoader.setMaterials(materials);
      //   objLoader.load('/static/models/lc.obj', function(obj) {
      //       scene.add(obj);
      //   })
      // })
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
