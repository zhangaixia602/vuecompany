<template>
  <header>丁山河水质净化厂大数据平台 <DatePage /></header>
  <section class='left'>
    <div class='card'>
      <h3 class='cardTitle'>厂区进出水变化趋势</h3>
      <BarPage 
        :options="{
        domSelector: 'dayStatis',
        viewData: this.dayStatis,
        smooth:true,
        data:this.dayStatisData,
        config:this.echartsConfig
      }"
      />
      <BarPage 
        :options="{
        domSelector: 'weekly',
        viewData: this.weeklyStatis,
        smooth:true,
        data:this.weeklyStatisData,
        config:this.echartsConfig
      }"
      />
    </div>
    <div class='card'>
      <h3 class='cardTitle'>工时统计</h3>
      <BarPage 
        :options="{
        domSelector: 'workHours',
        viewData: this.workHours,
        boundaryGap:true,
        data:this.workHoursData
      }"
      />
    </div>
  </section>
  <section class='right'>
    <div class='card'>
      <h3 class='cardTitle'>实时报警情况</h3>
       <CarouselTable
        :options="{
          viewData: this.columns,
          data:this.dataSource,
      }"
      />
    </div>
    <div class='card'>
      <h3 class='cardTitle'>化验室KPI</h3>
       <progressBar
        :options="{
          data:this.progressData,
      }"
      />
    </div>
  </section>
</template>
<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { defineComponent } from "vue";
import BarPage from '@/components/BarPage';
import CarouselTable from '@/components/CarouselTable';
import progressBar from '@/components/progressBar';
let envMap=null;
let scene=null;
export default defineComponent({
  name: 'waterPage',
  components: {
    'BarPage': BarPage,
    'CarouselTable': CarouselTable,
    'progressBar': progressBar
  },
  data () {
    return {
      dayStatis:{
        title:'当日统计',
        xAxis:Array(24).fill(1).map(function(item,index){
          return index+":00"
        }),
        legend:[{name:"进水",key:"inlet"},{name:"出水",key:"effluent"}]
      },
      dayStatisData:[
        {
          key:"inlet",
          type:"line",
          data:Array(24).fill(1).map(function(){
            return parseInt(Math.random()*20+40)
          })
        },
        {
          key:"effluent",
          type:"line",
          data:Array(24).fill(1).map(function(){
            return parseInt(Math.random()*30+20)
          })
        }
      ],
      weeklyStatis:{
        title:'本周统计',
        xAxis:Array(7).fill(1).map(function(item,index){
          index++
          return index
        }),
        legend:[{name:"进水",key:"inlet"},{name:"出水",key:"effluent"}]
      },
      weeklyStatisData:[
        {
          key:"inlet",
          type:"line",
          data:Array(7).fill(1).map(function(){
            return parseInt(Math.random()*200+400)
          })
        },
        {
          key:"effluent",
          type:"line",
          data:Array(7).fill(1).map(function(){
            return parseInt(Math.random()*300+200)
          })
        }
      ],
      workHours:{
        xAxis:['刘欢','周涛','王玮','李倩'],
        legend:[{name:"标准工时",key:"inlet"},{name:"实际工时",key:"effluent"}]
      },
      workHoursData:[
        {
          key:"inlet",
          type:"bar",
          data:Array(4).fill(1).map(function(){
            return parseInt(Math.random()*200+400)
          })
        },
        {
          key:"effluent",
          type:"bar",
          data:Array(4).fill(1).map(function(){
            return parseInt(Math.random()*300+200)
          })
        }
      ],
      dataSource:Array(24).fill(1).map(function(item,index){
        return {
          key:"id"+index,
          name: '水位表'+index,
          age:'10-'+parseInt(Math.random()*31),
          remark: index%2===0 ? '未解决' : '已处理'
        }
      }),
      columns: [
        {
          title:'设备',
          width:70,
          dataIndex:'name',
          key:'name'
        },
        {
          title:'日期',
          width:50,
          dataIndex:'age',
          key:'age'
        },
        {
          title:'状态',
          width:70,
          dataIndex:'remark',
          key:'remark'
        }
      ],
      progressData:Array(4).fill(1).map(function(item,index){
        return {
          key:"id"+index,
          name: index%2===0 ? '出厂水' : '回收水',
          actual:parseInt(Math.random()*200),
          standard:parseInt(Math.random()*310)
        }
      }),
    }
  },
  methods: {
    initThree () {
      let width = window.innerWidth //窗口宽
      let height = window.innerHeight
      this.renderer = new THREE.WebGL1Renderer({antialias: true})
      this.renderer.setSize(width, height)
      document.body.appendChild(this.renderer.domElement)
      
      scene = new THREE.Scene();
      const texLoader = new THREE.TextureLoader();
      texLoader.load('/static/models/lc/daySky.jpg', (texture) => {
        const geo = new THREE.SphereGeometry(5000, 60, 60)
        const mat = new THREE.MeshBasicMaterial({
          map: texture,
          side: 1,
          transparent: true,
          opacity: 1.0,
          fog: false
        })
        const sky = new THREE.Mesh(geo, mat)
        sky.scale.set(1, 1, 1)
        sky.rotation.set(0, -Math.PI / 1.2, 0)
        scene.add(sky)
      })
      //加载hdr
      this.setEnvMap('015');
      this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000)
      this.camera.position.set(0, 0, 400)
      this.camera.lookAt(scene.position)
      let light = new THREE.HemisphereLight(0xbbbbff, 0x444422, 1.5)
      light.position.set(0, 1, 0)
      scene.add(light)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.minDistance=0;
      this.controls.maxDistance=1700;
      this.controls.maxPolarAngle=Math.PI * 0.48;
      let objLoader = new GLTFLoader()
      objLoader.load('/static/models/lc.gltf', function(gltf) {
        const scenes = gltf.scene.clone();
        scenes.traverse((child) => {
          if (child.isMesh) {
            child.material.envMap =envMap
            child.material.envMapIntensity = 1;
          }
        })
        scene.add(scenes)
      })
    },
    setEnvMap(hdr) {
      const pmremGenerator = new THREE.PMREMGenerator(this.renderer)
      pmremGenerator.compileEquirectangularShader()
      new RGBELoader().setPath("/static/gltf/").load(hdr + ".hdr", (texture) => {
        envMap = pmremGenerator.fromEquirectangular(texture).texture
        pmremGenerator.dispose()
      })
    },
    animate () {
      requestAnimationFrame(this.animate)
      this.renderer.render(scene, this.camera)
    },
    echartsConfig (options){
      options.color= ['#207398','#ffFFff'];
      options.legend.itemWidth=7;
      options.legend.itemHeight=7;
      options.series.map((item)=>{
        item.lineStyle={
          width: 0
        };
        item.showSymbol=false;
        item.areaStyle={
          opacity: 0.6,
        };
      })
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
body{
  overflow: hidden;
}
header{
  background:url(../assets/bgt.png) no-repeat center center;
  background-size: cover;
  color: white;
  font-size: 1.3rem;
  line-height: 3.5rem;
}
.left,.right{
  width:11rem;
  height:calc(100% - 4rem);
  display: flex;
  flex-wrap: wrap;
  align-items:center;
  position: absolute !important;
  top:4rem;
}
.left{
  margin-left:1rem;
  left: 0;
}
.right{
  margin-right:1rem;
  right: 0;
}
.card{
  width:100%;
}
.cardTitle{
  font-size:0.7rem;
  color:white;
  text-align: center;
  width:100%;
  height:1.5rem;
  line-height:1.5rem;
  background:url(../assets/cardBg.png) no-repeat center center;
  background-size: 11rem 1.5rem;
  overflow: hidden;
}
#dayStatis,#weekly,#workHours{
  width:15rem;
  height:8rem;
  transform: translateX(-40px) scale(0.75);
}
</style>
