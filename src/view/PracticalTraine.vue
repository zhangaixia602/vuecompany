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
        ref="motion"
        :options="{
        domSelector: 'temDity',
        viewData: this.temDity,
        smooth:true,
        data:this.temDityData,
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
    <h2>设备监测</h2>
    <CarouselTable
      :options="{
        viewData: this.monitoringColumns,
        data:this.monitoringSource
      }"
    />
	</section>
  <div class="videoContainer">
    <video class="fullscreenVideo" autoplay loop controls muted>
      <source :src="require('../assets/jy.mp4')" type="video/mp4" />
    </video>
  </div>
</template>

<script>
import * as echarts from "echarts";
import BarPage from '@/components/BarPage';
import PiePage from '@/components/PiePage';
import PanelPage from '@/components/PanelPage';
import CarouselTable from '@/components/CarouselTable';
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
        title:"设备电耗",
        color:["#f77f04"],
        xAxis:categories,
        legend:[{name:"电压",key:"dity"}]
      },
      temDityData:[
        {
          key:"dity",
          type:"line",
          data:Array(10).fill(1).map(function(item,index){
          return parseInt(Math.random()*10)+10
        })
        }
      ],
      orderdif: {
      color:["#efc807","#91cc75"],
			title: "设备报警环比",
			xAxis: ["变频器","电机","直线模组","伺服系统"],
			legend: [{
				name: "今天",
				key: "tempe"
				}, {
				name: "昨天",
				key: "dity"
				}]
			},
		orderdifData: [{
			key: "tempe",
			type: "bar",
			data: Array(4).fill(1).map(function() {
				return parseInt(Math.random() * 20 + 20)
			    })
			},
			{
			key: "dity",
			type: "bar",
			data: Array(4).fill(1).map(function() {
				return parseInt(Math.random() * 30 + 30)
			})
			}
		],
     monitoringColumns: [
        {
          title:'设备名称',
          width:200,
          dataIndex:'name',
          key:'name'
        },
        {
          title:'设备类型',
          width:100,
          dataIndex:'age',
          key:'age'
        },
        {
          title:'设备状态',
          width:80,
          dataIndex:'remark',
          key:'remark'
        }
      ],
    monitoringSource:Array(10).fill(1).map(function(item,index){
          return {
            key:'id'+index,
            name:categories[index],
            age:index%2==0 ? index+"#电机" : index+"#伺服系统",
             remark: '开启'
         }
        })
    }
  },
  created(){
    this.dataRefreh();
  },
   methods: { 
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
    dataRefreh(){
        if(this.intervalId !=null){
            return;
        }
        this.intervalId=setInterval(()=>{
            this.currentY=this.currentY+0.1;
             this.currentX=this.currentX+0.1;
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
              //报警环比
            let biaxialChart=this.$refs.biaxial.myChart;
            biaxialChart.setOption({
                series:[
                    {
                        data:Array(4).fill(1).map(function() {
				                  return parseInt(Math.random() * 20 + 20)
			                  })
                    },
                    {
                        data:Array(4).fill(1).map(function() {
				                  return parseInt(Math.random() * 20 + 20)
			                  })
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
  .videoContainer{
    position:fixed;
    width:100%;
    height:100%;
    overflow:hidden;
    z-index:-10;
  }
  .videoContainer:before{
    content:"";
    position:absolute;
    width:100%;
    height:100%;
    display:block;
    top:0;
    left:0;
    z-index:-10;
  }
  .fullscreenVideo{
    width:100%;
    height:100%;
    object-fit:fill;
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
    #temDity{
		width:21rem;
		height:14.4rem;
	}
    #pie1,
    #orderdif{
        height:12.4rem;
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
        height:12rem;
	}
    .bottom h2{
        font-size: 0.8rem;
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
