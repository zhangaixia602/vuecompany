<template>
  <header>XXXX粮仓</header>
  <section class='left'>
    <div class='borderBg'>
      <PanelPage 
        :options="{
        title:this.panelTitle,
        data:this.panelData
      }"
      />
    </div>
    <div class='category borderBg'>
      <PiePage
        :options="{
        domSelector: 'pie',
        title:this.categoryTitle,
        data:this.categoryData
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
  <section class='bottom'>
    <div class='borderBg'>
      <h2 class='titleBg'>工单统计</h2>
      <div class='orderBox'>
        <div v-for='(order,index) in orders' class='orderItem' :key='index'>
          <div class='order-header'>
            <label class='textCenter'><i class="icon iconfont" :class="order.icon"></i></label>
            <span>{{order.title}}</span>
          </div>
          <div class='order-body textCenter'>
            <p>
              <label>数量</label>
              <span>{{order.quantity}}</span>
            </p>
            <p class='border'></P>
            <p>
              <label>完成率</label>
              <span>{{order.rate}}%</span>
            </p>
          </div>
        </div>
      </div>
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
      <CarouselTable
        :options="{
          title:this.carouselTitle,
          viewData: this.columns,
          data:this.dataSource,
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
import PanelPage from '@/components/PanelPage';
import CarouselTable from '@/components/CarouselTable';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
let scene=null;
export default defineComponent({
  name: 'FactoryPage',
  components: {
    'BarPage': BarPage,
    'PiePage': PiePage,
    'PanelPage': PanelPage,
    'CarouselTable': CarouselTable
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
      temDity:{
        title:"当日温湿度",
        xAxis:Array(24).fill(1).map(function(item,index){
          return index+':00'
        }),
        legend:[{name:"温度",key:"tempe"},{name:"湿度",key:"dity"}]
      },
      temDityData:[
        {
          key:"tempe",
          type:"line",
          data:Array(24).fill(1).map(function(){
            return parseInt(Math.random()*20+20)
          })
        },
        {
          key:"dity",
          type:"line",
          data:Array(24).fill(1).map(function(){
            return parseInt(Math.random()*30+30)
          })
        }
      ],
      vehicle:{
        title:"进出车辆情况",
        xAxis:Array(7).fill(1).map(function(item,index){
          return index++
        }),
        legend:[{name:"上周",key:"tempe"},{name:"本周",key:"dity"}]
      },
      vehicleData:[
        {
          key:"tempe",
          type:"bar",
          data:Array(7).fill(1).map(function(){
            return parseInt(Math.random()*20+20)
          })
        },
        {
          key:"dity",
          type:"bar",
          data:Array(7).fill(1).map(function(){
            return parseInt(Math.random()*30+30)
          })
        }
      ],
      panelTitle:'设备状况统计',
      panelData:[
        {
          icon:'icon-zhihuiyuanqu',
          label:'健康',
          value:parseInt(Math.random()*1000)
        },
        {
          icon:'icon-zhihuiyuanqu',
          label:'异常',
          value:parseInt(Math.random()*1000)
        },
        {
          icon:'icon-zhihuiyuanqu',
          label:'维护中',
          value:parseInt(Math.random()*1000)
        }
      ],
      orders:[
        {
          icon:'icon-yaoji',
          title:'药剂',
          rate:(Math.random()*100).toFixed(2),
          quantity:parseInt(Math.random()*100)
        },
        {
          icon:'icon-qiti',
          title:'气控',
          rate:(Math.random()*100).toFixed(2),
          quantity:parseInt(Math.random()*100)
        },
        {
          icon:'icon-a-28tongfengfengshan',
          title:'干控',
          rate:(Math.random()*100).toFixed(2),
          quantity:parseInt(Math.random()*100)
        },
        {
          icon:'icon-lengquebeng',
          title:'温控',
          rate:(Math.random()*100).toFixed(2),
          quantity:parseInt(Math.random()*100)
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
  left:50%;
  color:white;
  font-size:0.6rem;
  transform:translateX(-50%);
 }
.borderBg{
  width:14rem;
  height:10rem;
  background:url(../assets/border.png) no-repeat center center;
  background-size: 14rem 10rem;
  overflow: hidden;
}
.left .borderBg:first-child{
  width:14rem;
  height:5rem;
  background-size: 14rem 5rem;
}
.bottom .borderBg:first-child{
  width:28rem;
  height:8rem;
  background-size:28rem 8rem;
}
.bottom .titleBg{
  margin-bottom:0.5rem;
}
#category,#temDity,#pie,#vehicle{
  width:14rem;
  height:10rem;
}
.orderBox{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.orderItem{
  width:25%;
  height:calc(100% - 1.8rem);
}
.order-header{
  text-align: center;
  margin-bottom:0.7rem;
}
.order-header label{
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(4,103,247,0.2);
  border-radius: 50%;
  margin:0 auto;
}
.order-body label{
  display:block;
}
.order-body span{
  color:rgb(0, 255, 21);
}
.order-body p{
  width:2rem;
  text-align: center;
}
.order-body p.border{
  margin: 0 0.2rem;
  width: 0.2rem;
  height: 1rem;
  background: #00fff3;
}
</style>
