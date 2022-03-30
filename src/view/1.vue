<template>
  <div id="granary"></div>
</template>
<script>
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
let scene=null;
export default {
  name: 'GranaryPage',
  methods: {
    handleScroll () {
      this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    },
    initThree () {
      let mapUrl={
        Cinder_Block: '/static/models/granary/Cinder_Block.png',
        Vegetation_Grass_Artificial: '/static/models/granary/Vegetation_Grass_Artificial.jpg',
        Tile_Limestone_Multi: '/static/models/granary/Tile_Limestone_Multi.jpg',
        Translucent_Glass_Sky_Reflection: '/static/models/granary/Translucent_Glass_Sky_Reflection.jpg',
        Mirror_01: '/static/models/granary/Mirror_01.jpg',
        Siding_Rusty_Metal: '/static/models/granary/Siding_Rusty_Metal.jpg',
        Stone_Sandstone_Ashlar_Light: '/static/models/granary/Stone_Sandstone_Ashlar_Light.jpg',
      }
      let threeLoader = document.getElementById('granary')
      let width = window.innerWidth //窗口宽
      let height = window.innerHeight
      this.renderer = new THREE.WebGL1Renderer({antialias: true})
      this.renderer.setSize(width, height)
      threeLoader.appendChild(this.renderer.domElement)
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0xeeeeee)

      let light = new THREE.HemisphereLight(0xbbbbff, 0x444422, 1.5)
      light.position.set(0, 1, 0)
      scene.add(light)
      this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000)
      this.camera.position.set(0, 0, 400)
      this.camera.lookAt(scene.position)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      let objLoader = new OBJLoader()
      let mtlLoader = new MTLLoader()
      mtlLoader.load('/static/models/granary.mtl', function(materials) {
        objLoader.setMaterials(materials)
        objLoader.load('/static/models/granary.obj', function(obj) {
          obj.children.map((child,i)=>{
            if(child.material instanceof Array){
              child.material.map((item,index)=>{
                if(item.name!=='FrontColor' && index===0){
                  obj.children[i].material[index]=new THREE.MeshLambertMaterial({
                    map:new THREE.TextureLoader().load(mapUrl[item.name])
                  })
                }
              })
            }else{
              if(child.material.name!=='FrontColor'){
                obj.children[i].material=new THREE.MeshLambertMaterial({
                  map:new THREE.TextureLoader().load(mapUrl[child.material.name])
                })
              }
            }
          })
          scene.add(obj);
        })
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
