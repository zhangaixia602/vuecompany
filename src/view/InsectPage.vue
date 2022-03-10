<template>
  <div id="threeLoader"></div>
</template>
<script>
import * as Three from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
let mixer = null
let clock = new Three.Clock()
export default {
  name: 'InsectPage',
  methods: {
    handleScroll () {
      this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    },
    initThree () {
      let threeLoader = document.getElementById('threeLoader')
      let width = 1349
      let height = 600
      this.renderer = new Three.WebGL1Renderer({antialias: true})
      this.renderer.setSize(width, height)
      threeLoader.appendChild(this.renderer.domElement)

      this.scene = new Three.Scene()
      this.scene.background = new Three.Color(0xeeeeee)

      let light = new Three.HemisphereLight(0xbbbbff, 0x444422, 1.5)
      light.position.set(0, 1, 0)
      this.scene.add(light)
      this.camera = new Three.PerspectiveCamera(50, width / height, 1, 10000)
      this.camera.position.set(0, 0, 400)
      this.camera.lookAt(this.scene.position)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      let loader = new GLTFLoader()
      loader.load('../../../static/models/Bee.glb', (gltf) => {
        this.scene.add(gltf.scene)
        this.scene.scale.set(15, 15, 15)
        mixer = new Three.AnimationMixer(gltf.scene)
        var AnimationAction = mixer.clipAction(gltf.animations[0])
        AnimationAction.play()
      })
    },
    animate () {
      requestAnimationFrame(this.animate)
      this.renderer.render(this.scene, this.camera)
      if (mixer !== null) {
        mixer.update(clock.getDelta())
      }
    }
  },
  mounted () {
    this.initThree()
    this.animate()
  }
}
</script>
