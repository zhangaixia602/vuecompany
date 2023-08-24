<template>
 <header>实训装置可视化</header>
  <section class='left'>
    <div class='card borderBg' >
      <PiePage
        :options="{
        domSelector: 'pie1',
        title:this.categoryTitle,
        color:this.categoryColor,
        data:this.categoryData
      }"
      />  
      </div> 
       <div class='card'>
      <BarPage 
        ref="voltage"
        :options="{
        domSelector: 'temDity',
        viewData: this.temDity,
        smooth:true,
        data:this.temDityData,
        isLegend:true
      }"
       />  
      <BarPage 
        ref="motion"
        :options="{
        domSelector: 'temDity1',
        viewData: this.temDity1,
        smooth:true,
        data:this.temDityData1,
        isLegend:true
      }"
      />   
    </div>
    <div class='card borderBg'>      
            <BarPage 
            ref="biaxial"
            :options="{
			  domSelector: 'orderdif',
			  viewData: this.orderdif,
			  smooth:true,
			  data:this.orderdifData,
			   boundaryGap:true
			}" />		  
    </div>  
  </section> 
  <section class='right'>
    <div class='card borderBg textCenter'>
       <div class="devicesRight">
            <img src="../assets/zs_iSpt.png" />  
            <div class="deviceItem">
                <img src="../assets/zs.png" />
				<p>总数<span>4</span>台</p>
            </div>   
       </div>
       <div class="devicesLeft">
            <div class="deviceItem" v-for='(device,index) in devices' :key='index'>
                <img :src="require('../' + device.src)" />
				<p>{{device.title}}<span>{{device.num}}</span>{{device.unit}}</p>
            </div>
       </div>
    </div> 
    <div class='card'>
      <BarPage 
        :options="{
        domSelector: 'devicesTimes',
        viewData: this.devicesTimes,
        smooth:true,
        data:this.devicesTimesData,
        boundaryGap:true
      }"
      />
    </div> 
    <div class='borderBg'>
    <CarouselTable
        :options="{
          title:this.carouselTitle,
          viewData: this.columns,
          data:this.dataSource
      }"
      />
    </div>
  </section>
  <section class='bottom'>
        <h2>伺服运动</h2>
		<div class='panels'>
            <div class="panelItem"><p>X：<span>{{(this.currentX).toFixed(3)}}</span></p></div>
            <div class="panelItem"><p>Y：<span>{{(this.currentY).toFixed(3)}}</span></p></div>
            <div class="panelItem"><p>F：<span>{{(this.currentF).toFixed(3)}}</span></p></div>
        </div>
	</section>
 <div id="WebGL-output">      
</div>
</template>

<script>
import * as echarts from "echarts";
import BarPage from '@/components/BarPage';
import PiePage from '@/components/PiePage';
import PanelPage from '@/components/PanelPage';
import CarouselTable from '@/components/CarouselTable';
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import {TWEEN} from "three/examples/jsm/libs/tween.module.min.js";
let scene = null,model=null,curve=null;//存放路径对象
let clock=new THREE.Clock();
let mixer;
let progress=0;//物体移动的初始位置
const speed=0.002;//影响运动速率的值
//获取时间组
const categories = (function () {
  let now = new Date();
  let res = [];
  let len = 10;
  while (len--) {
    res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
    now = new Date(+now - 2000);
  }
  return res;
})();
export default {  
  name: 'PracticalTraine',
  components: {
    'BarPage': BarPage,
    'PiePage': PiePage,
    'PanelPage': PanelPage,
    'CarouselTable': CarouselTable
  },
  data (){ 
    return {
        intervalId:null,
        currentX:Math.random()*1,
        currentY:Math.random()*1,
        currentF:Math.random()*5,
      carouselTitle: 'SEO报警情况',
      dataSource:Array(10).fill(1).map(function(item,index){
          return {
            key:'id'+index,
            name:"10:07:"+(index%2==0 ? index*2 :index*3),
            age:index%2==0 ? "直线模组轴承故障" : "PLC线路故障",
             remark: '未解决'
         }
        }),
    devices: [
        {
            id:'onLine',
		    title: '在线数',
		    src: 'assets/online.png',
            num:2,
            unit:"台"
		},
        {
            id:'outLine',
            title:'离线数',
            src:'assets/lx.png',
            num:1,
            unit:"台"
        },
        {
            id:'outLine',
            title:'报警数',
            src:'assets/alarm.png',
            num:1,
            unit:"台"
        }
    ],
    columns: [
        {
          title:'报警时间',
          width:90,
          dataIndex:'name',
          key:'name'
        },
        {
          title:'变量',
          width:200,
          dataIndex:'age',
          key:'age'
        },
        {
          title:'报警描述',
          width:100,
          dataIndex:'remark',
          key:'remark'
        }
      ],
      categoryTitle:"设备开机率",
      categoryColor:["#73c0de","#546fc6"],
      categoryData:[
        {
          name:"开机率",
          value:2
        },
        {
          name:"待机率",
          value:2
        }
      ],
      devicesTimes:{
        color:['#73c0de','#fac859',"#ee6666","#546fc6"],
        title:"设备使用时长",
        xAxis:[],
        legend:[{name:"变频器",key:"tempe"},{name:"伺服系统",key:"dity"},{name:"电机",key:"tempe1"},{name:"直线模组",key:"dity1"}]
      },
       devicesTimesData:[
         {
          key:"tempe",
          type:"bar",
          data:[parseInt(Math.random() * 4+1)]
        },
        {
          key:"dity",
          type:"bar",
          data:[parseInt(Math.random() * 4+1)]
        },
         {
          key:"tempe1",
          type:"bar",
          data:[parseInt(Math.random() * 4+1)]
        },
        {
          key:"dity1",
          type:"bar",
          data:[parseInt(Math.random() * 4+1)]
        }
      ],
      temDity:{
        title:"电机运动波形",
        color:["#91cc75"],
        xAxis:categories,
        legend:[{name:"电压",key:"dity"}]
      },
      temDityData:[
        {
          key:"dity",
          type:"line",
          data:Array(10).fill(1).map(function(item,index){
          return index%2==0 ? 480 : -480
        })
        }
      ],
       temDity1:{
        title:"",
        color:["#91cc75"],
        xAxis:categories,
        legend:[{name:"电流",key:"tempe"}]
      },
      temDityData1:[
        {
          key:"tempe",
          type:"line",
          data:Array(10).fill(1).map(function(item,index){
          return index%2==0 ? -4 : 4
        })
        }
      ],
      orderdif: {
      color:["#efc807","#91cc75"],
			title: "双轴运动位置波形",
			xAxis:categories,
			legend: [{
				name: "X",
				key: "tempe"
				}, {
				name: "Y",
				key: "dity"
				}]
			},
		orderdifData: [{
			key: "tempe",
			type: "line",
			data: [0.4,0.6,0.8,0.6,0.5,0.5,0.4,0.3,0.2,0.1]
            },
			{
			key: "dity",
			type: "line",
			data: [0.7,0.6,0.5,0.4,0.3,0.3,0.2,0.1,0.1,0]
			}
		],
    }
  },
  created(){
    this.dataRefreh();
  },
   methods: { 
    initThree () {
      let width = window.innerWidth //窗口宽
	    let height = window.innerHeight
				this.renderer = new THREE.WebGL1Renderer({
					antialias: true
				})
				this.renderer.setSize(width, height)
				document.body.appendChild(this.renderer.domElement)

				scene = new THREE.Scene()
				let cubeTextureLoader = new THREE.CubeTextureLoader();
				cubeTextureLoader.setPath('/static/models/lc/');

				let textureCube = cubeTextureLoader.load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg',
					'nz.jpg'
				]);
				textureCube.encoding = THREE.sRGBEncoding;
				scene.background = textureCube;
				this.setEnvMap("004");

				this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000)
				this.camera.position.set(0, 0, 400)
				this.camera.lookAt(scene.position)
				let light = new THREE.HemisphereLight(0xbbbbff, 0x444422, 1.5)
				light.position.set(0, 50, 0)
				scene.add(light)
				this.controls = new OrbitControls(this.camera, this.renderer.domElement);
          // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.controls.enableDamping = true; 
          //是否可以缩放 
        this.controls.enableZoom = true; 
          //是否自动旋转 
        this.controls.autoRotate = false; 
          //设置相机距离原点的最远距离 
        this.controls.minDistance = 100; 
          //设置相机距离原点的最远距离 
        this.controls.maxDistance = 1600; 
          //是否开启右键拖拽 
        this.controls.enablePan = false; 
        this.controls.maxPolarAngle=Math.PI * 0.48;    
				let objLoader = new FBXLoader();
        let that=this;
				objLoader.load('/static/models/traine.fbx', function(glb) {
					glb.position.set(100, -50, 0);
					glb.scale.set(5, 5, 5);  
					scene.add(glb);
          glb.traverse(function(child)
          {
           if(child.name==="组005" || child.name==="组007" || child.name==="Á¢¿â×°Åä_4" || child.name==="PPT17-GFM-1416-08 ________.STEP_71" || child.name==="MFT07-M8 ______.STEP_36" || child.name==="MFT07-M3 ______.STEP_46" || child.name==="MFT07-M3 ______.STEP_45" || child.name==="MFT03-M3x8 ______________.STEP_49" || child.name==="MFT03-M3x8 ______________.STEP_48" || child.name==="M4x8 ______________.STEP_64" || child.name==="M4x8 ______________.STEP_63"){
              child.visible = false
           }
            if(child.name==="组002"){
             let textureLoder=new THREE.TextureLoader();
             let texture=textureLoder.load('/static/dif.png');
              const sphereModel=new THREE.Mesh(
                new THREE.BoxGeometry(2,2,2),
                new THREE.MeshBasicMaterial({
                  map:texture
                })
              );
               sphereModel.name='球';
               sphereModel.position.set(0,0,5.3);
               let tweenSphere=new TWEEN.Tween(sphereModel.position).to({"x":0,"y":0,"z":-5},3000).onUpdate(()=>{
                that.currentY=sphereModel.position.z;
               });
               tweenSphere.repeat(Infinity);
               tweenSphere.yoyo(true);
               tweenSphere.start();
               child.add(sphereModel);
               child.position.set(-23,child.position.y,child.position.z);
               let tween=new TWEEN.Tween(child.position).to({"x":-10,"y":child.position.y,"z":child.position.z},3000).onUpdate(()=>{
                progress=child.position.x;
                that.currentX=child.position.x;
               });
               tween.repeat(Infinity);
               tween.yoyo(true);
               tween.start();
            }
          });
				})
    
    },    
    animate() {
      //this.controls.update();
		  this.renderer.clear();
		  requestAnimationFrame(this.animate);
		  this.renderer.render(scene, this.camera);
      TWEEN.update();
	},
	setEnvMap(hdr) {
		new RGBELoader().setPath("/static/gltf/").load(hdr + ".hdr", (texture) => {
			texture.mapping = THREE.EquirectangularReflectionMapping;
			scene.environment = texture;
		})
	},
	echartsConfig(options) {
		options.color = ['#e7717b', '#80FFA5'];
		options.series[0].lineStyle = {
			width: 0
		};
		options.series[0].showSymbol = false;
		options.series[0].areaStyle = {
			opacity: 0.8,
			color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				offset: 0,
				//rgb(104, 186, 252)
				color: 'rgb(104, 186, 252)'
				},
				{
					offset: 1,
					color: 'rgb(224, 62, 76)'
				}
			])
		};
		return options;
	},
    onFire(){
        console.log(scene)
    },
    dataRefreh(){
        if(this.intervalId !=null){
            return;
        }
        this.intervalId=setInterval(()=>{
           // this.currentY=this.currentY+0.1;
            //更新电压电流X轴数据
            let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
            categories.shift();
            categories.push(axisData);
            //更新电流
            let chartInstance=this.$refs.motion.myChart;
            let currentChartData=this.$refs.motion.translateData().series[0].data;
            currentChartData.push(currentChartData.shift());
            chartInstance.setOption({
                xAxis:[{data:categories}],
                series:[
                    {
                        data:currentChartData
                    }
                ]
            })
            //更新电压
            let voltageChart=this.$refs.voltage.myChart;
            let voltageChartData=this.$refs.voltage.translateData().series[0].data;
            voltageChartData.push(voltageChartData.shift());
            voltageChart.setOption({
                xAxis:[{data:categories}],
                series:[
                    {
                        data:voltageChartData
                    }
                ]
            })
            //更新双轴运动数据
            let biaxialChart=this.$refs.biaxial.myChart;
            let biaxialChartData=this.$refs.biaxial.translateData().series[0].data;
            let biaxialChartDataY=this.$refs.biaxial.translateData().series[1].data;
            biaxialChartData.shift()
            biaxialChartData.push(this.currentX);
            biaxialChartDataY.shift()
            biaxialChartDataY.push(this.currentY);
            biaxialChart.setOption({
                xAxis:[{data:categories}],
                series:[
                    {
                        data:biaxialChartData
                    },
                    {
                        data:biaxialChartDataY
                    }
                ]
            })
        },3000)
    },
    clearRefreh(){//清楚定时器
        slearInterval(this.intervalId);
        this.intervalId=null;
    }
	},
	mounted() {
		this.initThree()
		this.animate()
	},
    onUnmounted(){
        this.clearRefreh();
    }
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	body {	
    width:100%;
		height:100%;
		margin:0;
		padding:0;
		overflow: hidden;
    background:url(../assets/px.jpg) no-repeat;

	}
  .container {
		position: relative;
		width: 100%;
		height: 100vh;
		overflow: hidden;
	}

	header {
		background: url(../assets/tb1.png) no-repeat center center;
		background-size: cover;
		text-align: center;
		color: white;
		font-size: 2rem;
		line-height: 3.5rem;
	}
  nav{
  position: absolute;
  top: 4rem;
  left: 50%;
  height:2.3rem;
  transform: translateX(-50%);
  z-index: 100000;
}
nav span{
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

	.left,
	.right {
    z-index: 100000;
		width: 22%;
		height: calc(100% - 6rem);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		position: absolute !important;
		top: 5rem;
	}

	.left {
		margin-left: 1rem;
		left: 0;
       
	}

	.right {
		margin-right: 1rem;
		right: 0;
	}
  .card{
    width: 100%;
	height: 35%;
	background:url(../assets/border.png) no-repeat center center; 
    background-size: 100% 100%;
	overflow: hidden;
 
}

.borderBg{
   	width: 100%;
	height: 30%;

}
	#category,
	#pie1,
	#devicesTimes,
    #orderdif,
    #temDity,
    #temDity1{
		width:21rem;
		height:14.4rem;
	}
    #pie1,
    #orderdif{
        height:12.4rem;
    }
     #temDity,
    #temDity1{
		height:7.2rem;
	}
    .devicesRight img{
        width:8rem;
        height:6rem;
    }
    .deviceItem img{
        width:3.5rem;
        height:3.5rem;
    }
    .deviceItem p{
        display:inline;
        color:white;
        font-size:14px;
    }
    .deviceItem span{
        color: #2703eb;
        font-size: 20px;
        padding: 0 0.2rem;
        font-weight: bold;
    }
    .bottom {
		position: absolute !important;
		bottom:2rem;
		left: 50%;
		transform: translateX(-50%);
        background:url(../assets/border.png) no-repeat center center; 
        background-size: 100% 100%;
	    overflow: hidden;
        width:20rem;
        height:6rem;
	}
    .bottom h2{
        font-size: 0.8rem;
        margin-bottom: 1rem;
        text-align: center;
        color: white;
    }
    .panels{
        display:flex;
        align-items:center;
        justify-content:space-around;
    }
    .panelItem{
        font-size:30px;
        color:white;
    }
    .panelItem span{
        color:#2703eb;
    }
</style>
