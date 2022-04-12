<template>
  <header>XXXX粮仓</header>
  <section class='left'>
    <div class='category'>
      <BarPage 
        :options="{
        domSelector: 'echarts',
        viewData: this.category,
        smooth:true,
        data:this.categoryData,
        config:this.echartsConfig
      }"
      />
    </div>
  </section>
  <section class='right'>
    <div class='category'>
      <BarPage 
        :options="{
        domSelector: 'echarts1',
        viewData: this.temDity,
        smooth:true,
        data:this.temDityData
      }"
      />
    </div>
  </section>
</template>
<script>
import * as echarts from "echarts";
import { defineComponent } from "vue";
import BarPage from '@/components/BarPage'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
let scene=null;
export default defineComponent({
  name: 'FactoryPage',
  components: {
    'BarPage': BarPage
  },
  data (){
    return {
      category:{
        title:"各粮品的存储量",
        xAxis:['小麦','大米','玉米'],
        legend:[]
      },
      categoryData:[
        {
          key:"",
          type:"line",
          data:[parseInt(Math.random()*100+1000),parseInt(Math.random()*100+800),parseInt(Math.random()*100+600)]
        }
      ],
      temDity:{
        title:"当日温湿度",
        xAxis:Array(24).fill(1).map(function(index){
          return index+':00'
        }),
        legend:[{name:"温度",key:"tempe"},{name:"湿度",key:"dity"}]
      },
      temDityData:[
        {
          key:"tempe",
          type:"bar",
          data:Array(24).fill(1).map(function(){
            return parseInt(Math.random()*20+20)
          })
        },
        {
          key:"dity",
          type:"bar",
          data:Array(24).fill(1).map(function(){
            return parseInt(Math.random()*30+30)
          })
        }
      ]
    }
  },
  methods: {
    initThree () {
      let width = window.innerWidth //窗口宽
      let height = window.innerHeight
      this.renderer = new THREE.WebGL1Renderer({antialias: true})
      this.renderer.setSize(width, height)
      document.body.appendChild(this.renderer.domElement)
      
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
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      let objLoader = new GLTFLoader()
      objLoader.load('/static/models/lc.gltf', function(glb) {
        glb.scene.position.set(-1000, -600,-1200);
        glb.scene.scale.set(5, 5, 8);
        glb.scene.rotateX(Math.PI/20);//绕x轴旋转π/4
        scene.add(glb.scene);
      })
    },
    setEnvMap(hdr) {
      new RGBELoader().setPath("/static/gltf/").load(hdr + ".hdr", (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
      })
    },
    animate () {
      requestAnimationFrame(this.animate)
      this.renderer.render(scene, this.camera)
    },
    echartsConfig (options){
      options.backgroundColor='rgba(4,103,247,0.2)';
      options.title.x='center';
      options.color=['#FFBF00'];
      options.title.textStyle.fontSize=14;
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
  background:url(../assets/tbg.png) no-repeat center center;
  background-size: cover;
  text-align: center;
  color: white;
  font-size: 2rem;
  line-height: 3.5rem;
}
.left{
  margin-left:1rem;
  position: absolute !important;
  top:4rem;
  left: 0;
}
.right{
  margin-right:1rem;
  position: absolute !important;
  top:4rem;
  right: 0;
}
#echarts,#echarts1{
  width:14rem;
  height:10rem;
}
</style>
