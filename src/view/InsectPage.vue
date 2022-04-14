<template>
<div>
  <header>智慧能源</header>
    <section class='left'>
    <div class='category borderBg'>
      <PiePage
        :options="{
        domSelector: 'pie',
        title:this.categoryTitle,
        data:this.categoryData
      }"
      />
    </div>
  </section>
  <div id="threeLoader">
  <div id="plant" :class="{show:this.isShow}">电表信息</div>
  </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { defineComponent } from "vue";
import PiePage from '@/components/PiePage'
import * as Three from 'three'
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
let mixer = null
let clock = new Three.Clock()
export default defineComponent( {
  name: 'InsectPage',
   components: {
    'PiePage': PiePage
  },
  data () {
    return {
       categoryTitle:"各粮品的存储量",
       categoryData:[
        {
          name:"小麦",
          value:parseInt(Math.random()*100+1000)
        },
        {
          name:"大米",
          value:parseInt(Math.random()*100+800)
        },
        {
          name:"玉米",
          value:parseInt(Math.random()*100+600)
        }
      ],
      isShow:false
    }
  },
  methods: {
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
      let loader = new GLTFLoader()
      loader.load('../../../static/models/lc3.gltf', (gltf) => {
        this.scene.position.set(-1000,-600,-1200);
        this.scene.scale.set(5,5,8);
        this.scene.add(gltf.scene)
        mixer = new Three.AnimationMixer(gltf.scene)
        var AnimationAction = mixer.clipAction(gltf.animations[0])
        AnimationAction.play()
      })
      window.addEventListener('click',this.clickModel,false);
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
    },
         echartsConfig (options){
      options.color= ['#FFBF00','#80FFA5'];
      options.series[0].lineStyle={
        width: 0
      };
      options.series[0].showSymbol=false;
      options.series[0].areaStyle={
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 191, 0)'
          },
          {
            offset: 1,
            color: 'rgb(224, 62, 76)'
          }
        ])
      };
      return options;
    }
  },
  
  mounted () {
    this.initThree()
    this.animate()
  }
})
</script>
<style scoped>
header{
  background:url(../assets/tb.png) no-repeat center center;
  background-size: cover;
  text-align: center;
  color: white;
  font-size: 2rem;
  line-height: 3.5rem;
}
#threeLoader{
  position: relative;
}
.borderBg{
  width:14rem;
  height:10rem;
  background:url(../assets/border.png) no-repeat center center;
  background-size: 14rem 10rem;
  overflow: hidden;
}
.left{
  width:14rem;
  height:calc(100% - 4rem);
  display: flex;
  flex-wrap: wrap;
  align-items:center;
  position: absolute !important;
  top:4rem;
  margin-left:1rem;
  top:4rem;
  left: 0;
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
#category,#temDity,#pie,#vehicle{
  width:14rem;
  height:10rem;
}
</style>
