<template>
  <header>智慧能源</header>
  <section class='left'>
    <div class='category borderBg'>
       <h3 class='cardTitle'>天然气/蒸汽占比</h3>
      <progressBar
        :options="{
          data:this.progressData,
      }"
      />
    </div>
    <div class='borderBg'>
     <PiePage
        :options="{
        domSelector: 'pie',
        title:this.categoryTitle,
        data:this.categoryData
      }"
      />
    </div>
  </section>  
  <section class='right'>
    <div class='temDity borderBg'>
      <BarPage 
        :options="{
        domSelector: 'temDity',
        viewData: this.temDity,
        smooth:true,
        data:this.temDityData,
        config:this.echartsConfig
      }"
      />
    </div>
    <div class='borderBg'>
     <BarPage 
        :options="{
        domSelector: 'vehicle',
        viewData: this.vehicle,
        smooth:true,
        data:this.vehicleData
      }"
      />
    </div>
  </section>
</template>
<script>
import * as echarts from "echarts";
import { defineComponent } from "vue";
import BarPage from '@/components/BarPage';
import PiePage from '@/components/PiePage';
import progressBar from '@/components/progressBar';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
let scene=null;
export default defineComponent({
  name: 'GranaryPage',
  components: {
    'BarPage': BarPage,
    'PiePage': PiePage,
    'progressBar': progressBar
  },
  data (){
    return {
      carouselTitle: '实时报警情况',
      dataSource:Array(24).fill(1).map(function(item,index){
        return {
          key:"id"+index,
          name: '超限报警',
          age:parseInt(Math.random()*100),
          remark: '未解决'
        }
      }),
      columns: [
        {
          title:'姓名',
          width:80,
          dataIndex:'name',
          key:'name'
        },
        {
          title:'年龄',
          width:60,
          dataIndex:'age',
          key:'age'
        },
        {
          title:'报警描述',
          width:120,
          dataIndex:'remark',
          key:'remark'
        }
      ],
      categoryTitle:"今日天然气能耗占比",
      categoryData:[
        {
          name:"A16",
          value:parseInt(Math.random()*10+10)
        },
        {
          name:"D19",
          value:parseInt(Math.random()*10+80)
        },
        {
          name:"C07",
          value:parseInt(Math.random()*10+60)
        },
          {
          name:"F18",
          value:parseInt(Math.random()*10+60)
        }
      ],
      temDity:{
        title:"本周统计",
        xAxis:Array(7).fill(1).map(function(item,index){
          index++
          return index
        }),
        legend:[{name:"水",key:"tempe"},{name:"电",key:"dity"}]
      },
      temDityData:[
        {
          key:"tempe",
          type:"line",
          data:Array(7).fill(1).map(function(){
            return parseInt(Math.random()*20+20)
          })
        },
        {
          key:"dity",
          type:"line",
          data:Array(7).fill(1).map(function(){
            return parseInt(Math.random()*30+30)
          })
        }
      ],
      vehicle:{
        title:"日电力负荷",
        xAxis:Array(24).fill(1).map(function(item,index){
          return index+":00"
        }),
        legend:[{name:"昨日",key:"tempe"},{name:"今日",key:"dity"}]
      },
       vehicleData:[
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
      ],
       progressData:Array(4).fill(1).map(function(item,index){
        return {
          key:"id"+index,
          name: index%2===0 ? '天然气' : '蒸汽',
          actual:parseInt(Math.random()*10),
          standard:parseInt(Math.random()*20)
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
      objLoader.load('/static/models/WisdomPort.glb', function(glb) {
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
body{
  overflow: hidden;
}
header{
  background:url(../assets/tbg.png) no-repeat center center;
  background-size: cover;
  text-align: center;
  color: white;
  font-size: 2rem;
  line-height: 3.5rem;
}
.left,.right{
  width:14rem;
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
 .bottom{
  position: absolute !important;
  bottom:1.8rem;
  left:62%;
  transform:translateX(-50%);
 }
.borderBg{
  width:14rem;
  height:10rem;
  background:url(../assets/border.png) no-repeat center center;
  background-size: 14rem 10rem;
  overflow: hidden;
}
.bottom .borderBg{
  width:15rem;
  height:5rem;
  background-size: 15rem 5rem;
}
.cardTitle{
  font-size:0.7rem;
  color:white;
  text-align: center;
  width:100%;
  height:1.5rem;
  line-height:1.5rem;
  background-size: 11rem 1.5rem;
  overflow: hidden;
}
#category,#temDity,#pie,#vehicle{
  width:14rem;
  height:10rem;
}
</style>
