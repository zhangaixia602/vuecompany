<template>
  <div id="threeLoader">
  <div id="plant" :class="{show:this.isShow}">电表信息</div>
  </div>
</template>
<script>
import * as Three from 'three'
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
let mixer = null
let clock = new Three.Clock()
export default {
  name: 'InsectPage',
  data () {
    return {
      isShow:false
    }
  },
  methods: {
    handleScroll () {
      this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    },
    initThree () {
      let threeLoader = document.getElementById('threeLoader')
      let width = window.innerWidth
      let height = window.innerHeight
      this.renderer = new Three.WebGL1Renderer({antialias: true})
      this.renderer.setSize(width, height)
      threeLoader.appendChild(this.renderer.domElement)      
   
      this.scene = new Three.Scene()
      this.setEnvMap("004");
      this.scene.background = new Three.Color(0xeeeeee)
      //添加小图标
      //let geometry = new Three.BufferGeometry()
      var texture = new Three.TextureLoader().load("../../../static/cameraRed.png");
      // 创建精灵材质对象SpriteMaterial
      let SpriteMaterial = new Three.SpriteMaterial({
        color:0xff00ff,
        map: texture,//设置精灵纹理贴图
      });
      let sprite = new Three.Sprite(SpriteMaterial);
      this.scene.add(sprite);
      // 控制精灵大小，比如可视化中精灵大小表征数据大小
      sprite.scale.set(15, 15, 1); //// 只需要设置x、y两个分量就可以
      sprite.position.set(190, 110, -106)
      sprite.name = "电表"
      let light = new Three.HemisphereLight(0xbbbbff, 0x444422, 1.5)
      light.position.set(0, 1, 0)
      this.scene.add(light)
      this.camera = new Three.PerspectiveCamera(50, width / height, 1, 10000)
      this.camera.position.set(0, 0, 400)
      this.camera.lookAt(this.scene.position)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      let fbxLoader = new FBXLoader();
           fbxLoader.load('../../../static/models/t.fbx', (fbx)=> {
           this.scene.add(fbx.scene);
           mixer = new Three.AnimationMixer(fbx.scene)
           var AnimationAction = mixer.clipAction(fbx.animations[0])
           AnimationAction.play()
      });

      // let loader = new GLTFLoader()
      // loader.load('../../../static/models/lc3.gltf', (gltf) => {
      //   this.scene.add(gltf.scene)
      //   mixer = new Three.AnimationMixer(gltf.scene)
      //   var AnimationAction = mixer.clipAction(gltf.animations[0])
      //   AnimationAction.play()
      // })
      // window.addEventListener('click',this.clickModel,false);
    },
    setEnvMap(hdr) {
      new RGBELoader().setPath("../../../static/gltf/").load(hdr + ".hdr", (texture) => {
        texture.mapping = Three.EquirectangularReflectionMapping;
        this.scene.background = texture;
        this.scene.environment = texture;
      });
    },
    clickModel (event) {
      let raycaster = new Three.Raycaster();
      let mouse = new Three.Vector2();
      mouse.x = ( event.clientX / window.innerWidth )*2 - 1;
      mouse.y = -( event.clientY / window.innerHeight )*2 + 1;
      raycaster.setFromCamera( mouse, this.camera );
      let intersects = raycaster.intersectObjects( this.scene.children );
      if(intersects[0]['object']['name']==="电表"){
        if(this.isShow){
          this.isShow=false
        }else{
          this.isShow=true
        }
      }
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
<style scoped>
#threeLoader{
  position: relative;
}
#plant{
  display:none;
  font-size:0.5rem;
  color:red;
  position: absolute;
  pointer-events: auto;
  user-select: none;
}
#plant.show{
  display:block;
}
</style>
