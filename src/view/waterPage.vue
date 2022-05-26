<template>
  <header>丁山河水质净化厂大数据平台 <DatePage /></header>
  <nav>
    <a v-for='(nav,index) in navs' :key='index' @click="showNav(nav,index)" :class="{active: this.currentIndex===index}">{{nav.title}}</a>
  </nav>
  <section class='left'>
    <div class='card' :style="{ display: this.currentNav==='home' ? 'block' : 'none' }">
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
    <div class='card' :style="{ display: this.currentNav==='home' ? 'block' : 'none' }">
      <h3 class='cardTitle'>工时统计</h3>
      <BarPage 
        :options="{
        domSelector: 'workHours',
        viewData: this.workHours,
        boundaryGap:true,
        data:this.workHoursData,
        config:this.BarConfig
      }"
      />
    </div>
    <div class='card' :style="{ display: this.currentNav==='monitor' ? 'block' : 'none' }">
      <h3 class='cardTitle'>实时监控</h3>
      <video controls="controls" v-for="(alarmVideo,index) in alarmVideos" :key="index" autoplay="true" loop>
        <source :src="require('../assets/'+alarmVideo)" type="video/mp4" />
        您的浏览器不支持该视频
      </video>
    </div>
    <div class='card' :style="{ display: this.currentNav==='order' ? 'block' : 'none' }">
      <h3 class='cardTitle'>保养工单</h3>
      <PiePage
        :options="{
        domSelector: 'maintenance',
        data:this.maintenanceData,
        config:this.orderConfig
      }"
      />
    </div>
    <div class='card' :style="{ display: this.currentNav==='order' ? 'block' : 'none' }">
      <h3 class='cardTitle'>维修工单</h3>
      <PiePage
        :options="{
        domSelector: 'repair',
        data:this.repairData,
        config:this.orderConfig
      }"
      />
    </div>
     <div class='card' :style="{ display: this.currentNav==='order' ? 'block' : 'none' }">
      <h3 class='cardTitle'>巡检工单</h3>
      <PiePage
        :options="{
        domSelector: 'patrol',
        data:this.patrolData,
        config:this.orderConfig
      }"
      />
    </div>
  </section>
  <section class='right'>
    <div class='card' :style="{ display: this.currentNav==='home' ? 'block' : 'none' }">
      <h3 class='cardTitle'>设备KPI</h3>
      <PiePage
        :options="{
        domSelector: 'category',
        data:this.categoryData,
        config:this.categoryConfig
      }"
      />
    </div>
    <div class='card' :style="{ display: this.currentNav==='home' ? 'block' : 'none' }">
      <h3 class='cardTitle'>化验室KPI</h3>
       <progressBar
        :options="{
          data:this.progressData,
      }"
      />
    </div>
    <div class='card' :style="{ display: this.currentNav==='monitor' ? 'block' : 'none' }">
      <h3 class='cardTitle'>当天报警统计</h3>
      <BarPage 
        :options="{
        domSelector: 'alarm',
        viewData: this.alarm,
        boundaryGap:true,
        data:this.alarmData,
        config:this.BarConfig
      }"
      />
    </div>
    <div class='card' :style="{ display: this.currentNav==='monitor' ? 'block' : 'none' }">
      <h3 class='cardTitle'>实时报警情况</h3>
       <CarouselTable
        :options="{
          viewData: this.columns,
          data:this.dataSource,
      }"
      />
    </div>
    <div class='card' :style="{ display: this.currentNav==='order' ? 'block' : 'none' }">
      <h3 class='cardTitle'>工单对比</h3>
      <BarPage 
        :options="{
        domSelector: 'weeklyOrder',
        viewData: this.weeklyOrder,
        boundaryGap:true,
        data:this.weeklyOrderData,
        config:this.BarConfig
      }"
      />
      <BarPage 
        :options="{
        domSelector: 'mouthOrder',
        viewData: this.mouthOrder,
        boundaryGap:true,
        data:this.mouthOrderData,
        config:this.BarConfig
      }"
      />
    </div>
    <div class='card' :style="{ display: this.currentNav==='order' ? 'block' : 'none' }">
      <h3 class='cardTitle'>实时工单</h3>
       <CarouselTable
        :options="{
          viewData: this.orderColumns,
          data:this.orderSource,
      }"
      />
    </div>
  </section>
  <section class='bottom'>
    <div class='card' :style="{ display: this.currentNav==='home' ? 'block' : 'none' }">
      <h3 class='cardTitle'>值班日志</h3>
       <CarouselTable
        :options="{
          viewData: this.dutyColumns,
          data:this.dutySource,
      }"
      />
    </div>
  </section>
</template>
<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { defineComponent } from "vue";
import BarPage from '@/components/BarPage';
import PiePage from '@/components/PiePage';
import CarouselTable from '@/components/CarouselTable';
import progressBar from '@/components/progressBar';
let envMap=null;
let scene=null;
export default defineComponent({
  name: 'waterPage',
  components: {
    'BarPage': BarPage,
    'PiePage': PiePage,
    'CarouselTable': CarouselTable,
    'progressBar': progressBar
  },
  data () {
    return {
      navs:[
        {
          id:'home',
          title:'首页'
        },
        {
          id:'order',
          title:'工单统计'
        },
        {
          id:'monitor',
          title:'实时监控'
        }
      ],
      currentIndex:0,
      currentNav:'home',
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
            return parseInt(Math.random()*20+40)
          })
        },
        {
          key:"effluent",
          type:"line",
          data:Array(7).fill(1).map(function(){
            return parseInt(Math.random()*30+20)
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
          age:'2021 10-'+parseInt(Math.random()*31),
          remark: index%2===0 ? '未解决' : '已处理'
        }
      }),
      columns: [
        {
          title:'设备',
          width:90,
          dataIndex:'name',
          key:'name'
        },
        {
          title:'日期',
          width:90,
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
      dutySource:Array(24).fill(1).map(function(item,index){
        return {
          key:"id"+index,
          officeLocation:index%2===0 ? 'A12' : (index>6 ? 'F12' : 'D19'),
          name:index%2===0 ? '张三' : (index>14 ? '王庆' : '李四'),
          date:'2021-12-'+(index++),
          remark: index%2===0 ? '早班' : '晚班'
        }
      }),
      dutyColumns: [
        {
          title:'位置',
          width:70,
          dataIndex:'officeLocation',
          key:'officeLocation'
        },
        {
          title:'值班人',
          width:100,
          dataIndex:'name',
          key:'name'
        },
        {
          title:'值班时间',
          width:100,
          dataIndex:'date',
          key:'date'
        },
        {
          title:'备注',
          width:70,
          dataIndex:'remark',
          key:'remark'
        }
      ],
      categoryData:[
         {
          name:"电磁流量计",
          value:parseInt(Math.random()*100+700)
        },
        {
          name:"校验模块",
          value:parseInt(Math.random()*100+800)
        },
        {
          name:"PE储药罐",
          value:parseInt(Math.random()*100+600)
        },
        {
          name:"其他",
          value:parseInt(Math.random()*100+1000)
        }
      ],
      alarm:{
        xAxis:['一级报警','二级报警','三级报警'],
        legend:[{name:"报警级别",key:"inlet"}]
      },
      alarmData:[
        {
          key:"inlet",
          type:"bar",
          data:Array(4).fill(1).map(function(){
            return parseInt(Math.random()*200+400)
          })
        }
      ],
      alarmVideos:['lc.mp4','lc.mp4','lc.mp4'],
      maintenanceData:[
        {
          name:"完成",
          value:parseInt(Math.random()*100+700)
        },
        {
          name:"进行中",
          value:parseInt(Math.random()*100+800)
        },
        {
          name:"未开始",
          value:parseInt(Math.random()*100+600)
        }
      ],
      repairData:[
        {
          name:"完成",
          value:parseInt(Math.random()*100+500)
        },
        {
          name:"进行中",
          value:parseInt(Math.random()*100+400)
        },
        {
          name:"未开始",
          value:parseInt(Math.random()*100+300)
        }
      ],
      patrolData:[
          {
          name:"完成",
          value:parseInt(Math.random()*100+700)
        },
        {
          name:"异常",
          value:parseInt(Math.random()*100+800)
        },
        {
          name:"进行中",
          value:parseInt(Math.random()*100+600)
        },
        {
          name:"未开始",
          value:parseInt(Math.random()*100+1000)
        }
      ],
      weeklyOrder:{
        title:'周对比',
        xAxis:Array(7).fill(1).map(function(item,index){
          return index+":00"
        }),
        legend:[{name:"上周",key:"inlet"},{name:"本周",key:"effluent"}]
      },
      weeklyOrderData:[
        {
          key:"inlet",
          type:"bar",
          data:Array(7).fill(1).map(function(){
            return parseInt(Math.random()*20+40)
          })
        },
        {
          key:"effluent",
          type:"bar",
          data:Array(7).fill(1).map(function(){
            return parseInt(Math.random()*30+20)
          })
        }
      ],
      mouthOrder:{
        title:'月对比',
        xAxis:Array(31).fill(1).map(function(item,index){
          index++
          return index
        }),
        legend:[{name:"上月",key:"inlet"},{name:"本月",key:"effluent"}]
      },
      mouthOrderData:[
        {
          key:"inlet",
          type:"bar",
          data:Array(31).fill(1).map(function(){
            return parseInt(Math.random()*200+400)
          })
        },
        {
          key:"effluent",
          type:"bar",
          data:Array(31).fill(1).map(function(){
            return parseInt(Math.random()*300+200)
          })
        }
      ],
      orderColumns:[
        {
          title:'所属区域',
          width:80,
          dataIndex:'area',
          key:'name'
        },
        {
          title:'工单类型',
          width:80,
          dataIndex:'type',
          key:'remark'
        },
        {
          title:'日期',
          width:80,
          dataIndex:'date',
          key:'date'
        }
      ],
      orderSource:Array(24).fill(1).map(function(item,index){
        return {
          key:"id"+index,
          area:index%2===0 ? 'A12' : (index>6 ? 'F12' : 'D19'),
          type:index%2===0 ? '保养' : (index>14 ? '维修' : '巡检'),
          date:'2021-12-'+(index++)
        }
      }),
    }
  },
  methods: {
    showNav (nav,index) {
      this.currentNav=nav.id
      this.currentIndex=index
    },
    initThree () {
      let width = window.innerWidth //窗口宽
      let height = window.innerHeight
      this.renderer = new THREE.WebGL1Renderer({antialias: true})
      this.renderer.setSize(width, height)
      document.body.appendChild(this.renderer.domElement);
      document.body.style.overflow="hidden";
      
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
      this.controls.minAzimuthAngle=Math.PI * 0.48;
      let objLoader = new GLTFLoader();
      let dracoLoader=new DRACOLoader();
      dracoLoader.setDecoderPath('/draco/');
      dracoLoader.preload();
      objLoader.setDRACOLoader(dracoLoader);
        objLoader.load('/static/models/3dcity-processed.glb', function(glb) {
        glb.scene.position.set(-1000, -600,-1200);
        glb.scene.scale.set(4, 4, 8);
        glb.scene.rotateY(-80);//绕x轴旋转π/4  
        scene.add(glb.scene);
      })
      // objLoader.load('/static/models/3dcity.glb', function(gltf) {
      //   gltf.scene.position.set(200, -600,-1200);
      //   gltf.scene.scale.set(5, 5, 8);
      //   gltf.scene.rotateY(-80);//绕x轴旋转π/4    
      //   const scenes = gltf.scene.clone();
      //   scenes.traverse((child) => {
      //     if (child.isMesh) {
      //       child.material.envMap =envMap
      //       child.material.envMapIntensity = 1;
      //     }
      //   })
      //   scene.add(scenes)
      // })
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
    },
    categoryConfig (options){
      options.legend={show:false};
      options.series[0].label={
				alignTo: 'edge',
				formatter: '{b}\n{c}',
        minMargin: 5,
        edgeDistance: 10,
        lineHeight: 15,
				color: 'white'
      }
      return options
    },
    BarConfig (options){
      options.legend.y='-20px';
      return options
    },
    orderConfig (options){
      options.backgroundColor="transparent";
      options.legend={
        orient: 'vertical',
        left: 'left',
        textStyle: {
          color: '#fff'
        }
      };
      options.series[0].radius='80%';
      options.series[0].label={
        position:'inside',
        formatter: '{c}',
        color: '#fff' 
      };
      return options
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
video{
  margin-top:0.5rem;
  width:100%;
}
header{
  background:url(../assets/bgt.png) no-repeat center center;
  background-size: cover;
  color: white;
  font-size: 1.3rem;
  line-height: 3.5rem;
}
nav{
  position: absolute;
  top: 3rem;
  left: 50%;
  transform: translateX(-50%);
}
nav a{
  display: inline-block;
  cursor: pointer;
  font-size:0.6rem;
  color:white;
  width:5.1rem;
  height:2.3rem;
  text-align: center;
  line-height: 2.3rem;
  background:url(../assets/navG.png) no-repeat center center;
}
nav a.active{
  color:#58fdff;
  background:url(../assets/nav.png) no-repeat center center;
}
.left,.right{
  width:20%;
  height:calc(100% - 4rem);
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
  height:8rem;
  bottom:1rem;
  left:50%;
  transform:translateX(-50%);
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
  background-size:100% 1.5rem;
  overflow: hidden;
}
#dayStatis,#weekly,#workHours,#category,#alarm,#patrol,#maintenance,#mouthOrder,#weeklyOrder,#repair{
  width:15rem;
  height:8rem;
  transform: translateX(-14px) scale(0.9);
}
@media (min-width:1920px) {
	#dayStatis,#weekly,#workHours,#category,#alarm,#patrol,#maintenance,#mouthOrder,#weeklyOrder,#repair{
	  width:23rem;
	  height:16rem;
	  transform: translateX(-36px) scale(0.8);
	}
	video{
	  margin-top:2rem;
	}
}
</style>
