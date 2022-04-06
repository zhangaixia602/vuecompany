<template>
  <div id="threeLoader">
  </div>
</template>
<script>
import * as Three from 'three'
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
let mixer = null
let clock = new Three.Clock()
let scene = null
export default {
  name: 'EnvironmentPage',
  data () {
    return {
      menuData: [
        {
          name:'左侧楼',
          src:'/static/models/model3.gltf'
        },
        {
          name:'楼底',
          src:'/static/models/model.gltf',
          position:[210, 0,-144]
        },
        {
          name:'楼层1',
          src:'/static/models/model1.gltf',
          position:[210, 0, -144],
        },
        {
          name:'楼层2',
          src:'/static/models/model1.gltf',
          position:[210, 3, -144],
        },
        {
          name:'楼层3',
          src:'/static/models/model1.gltf',
         position:[210, 6, -144],
        },
        {
          name:'楼层4',
          src:'/static/models/model1.gltf',
          position:[210, 9, -144],
        },
         {
          name:'楼层5',
          src:'/static/models/model1.gltf',
          position:[210, 12, -144],
        },
        {
          name:'楼层6',
          src:'/static/models/model1.gltf',
          position:[210, 15, -144],
        },
        {
          name:'楼层7',
          src:'/static/models/model1.gltf',
          position:[210,18, -144],
        },
        {
          name:'楼顶',
          src:'/static/models/model2.gltf',
          position:[210, 0, -144]
        }
      ]
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
   
      scene = new Three.Scene()
      this.setEnvMap("004");
      let light = new Three.HemisphereLight(0xbbbbff, 0x444422, 1.5)
      light.position.set(0, 1, 0)
      scene.add(light)
      this.camera = new Three.PerspectiveCamera(50, width / height, 1, 10000)
      this.camera.position.set(0, 0, 400)
      this.camera.lookAt(scene.position)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      let loader = new GLTFLoader()
      this.menuData.map(function(item){
          loader.load(item.src, (gltf) => {
            gltf.scene.name=item.name;
            if(item.leve){
                let i=0;
                while (i<item.leve){
                  console.log(gltf.scene)
                  const cloneGltf=gltf.scene.clone();
                  cloneGltf.name=item.name+i;
                  if(item.position){
                    gltf.scene.translateY(item.position);
                  }
                  scene.add(cloneGltf)
                  i++;
                }
            }else{
                if(item.position){
                  gltf.scene.translateY(item.position[1]);
                  gltf.scene.translateZ(item.position[2]);
                  gltf.scene.translateX(item.position[0]);
                  gltf.scene.rotateY(Math.PI / 60);
                  gltf.scene.scale.set(1,1,1.2)
                }
                scene.add(gltf.scene)
            }
          })
       })
    },
    setEnvMap(hdr) {
      new RGBELoader().setPath("/static/gltf/").load(hdr + ".hdr", (texture) => {
        texture.mapping = Three.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
      });
    },
    cloneModel (gltf,item) {
        let i=0;
        while (i<item.leve){
            const cloneGltf=gltf.clone();
            cloneGltf.scene.name=item.name+i;
            scene.add(cloneGltf)
            i++;
        }
    },
    animate () {
      requestAnimationFrame(this.animate)
      this.renderer.render(scene, this.camera)
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