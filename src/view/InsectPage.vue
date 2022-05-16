<template>
<div id="WebGL-output">
        <div class="css_style" id="lableItem">
            <span class="css3dTitleWarning" id="lableTitleWarning">报警信息: 无异常</span>
            <br>
            <span class="css3dTitleWarning" id="lableTitleTemperature">温度: 37℃</span>
        </div>
    </div>
    <div id="WebGL-output1">
        <div class="css_style" id="lableItem">
            <span class="css3dTitleWarning" id="lableTitleWarning">报警信息: 无异常</span>
            <br>
            <span class="css3dTitleWarning" id="lableTitleTemperature">温度: 36℃</span>
        </div>
    </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { CSS3DRenderer,CSS3DObject} from "three/examples/jsm/renderers/CSS3DRenderer"
    
var scene, orbitControls,labelRenderer;
let css3DObject,css3DObject1;  

export default {
  
  name: "InsertPage",  
  
   methods: {
    initThree () {
      let width = window.innerWidth //窗口宽
      let height = window.innerHeight
      this.renderer = new THREE.WebGL1Renderer({antialias: true})
      this.renderer.setSize(width, height)
    
      
      scene = new THREE.Scene()
      let cubeTextureLoader = new THREE.CubeTextureLoader();
			cubeTextureLoader.setPath( '/static/models/lc/' );

			let textureCube = cubeTextureLoader.load( ['4.jpg', '1.jpg', '2.jpg', '5.jpg', '6.jpg', '3.jpg' ] );
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
      this.controls.maxDistance=1700;
      this.controls.maxPolarAngle=Math.PI * 0.48;    
      document.body.appendChild(this.renderer.domElement);
      labelRenderer = new CSS3DRenderer();
      labelRenderer.setSize(window.innerWidth,window.innerHeight);     
      labelRenderer.domElement.style.position = 'absolute';
      labelRenderer.domElement.style.top = '0px';
      document.body.appendChild(labelRenderer.domElement);
      this.addCSS3DLabelToScene();
      let objLoader = new GLTFLoader();
      let dracoLoader=new DRACOLoader();
     
          
      dracoLoader.setDecoderPath('/draco/');
      dracoLoader.preload();
      objLoader.setDRACOLoader(dracoLoader);
      objLoader.load('/static/models/smartfactory-processed.glb', function(glb) {
        // glb.scene.position.set(-1000, -600,-1200);
        glb.scene.scale.set(9, 8, 10);
        glb.scene.rotateY(-80);//绕y轴旋转π/4        
        scene.add(glb.scene);
        css3DObject.position.x = 180;
        css3DObject.position.y = glb.scene.position.y + 50 + 38;
        css3DObject.position.z = glb.scene.position.z;    
      })
   
      
     
      orbitControls = new OrbitControls(this.camera, labelRenderer.domElement);
      orbitControls.maxDistance=1700;
      orbitControls.maxPolarAngle=Math.PI * 0.48; 
      orbitControls.update(); 
      css3DObject.visible = true;   
      document.body.appendChild(this.renderer.domElement)
    
    },
    setEnvMap(hdr) {
      new RGBELoader().setPath("/static/gltf/").load(hdr + ".hdr", (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
      })
    },
    modifyDocument(id, color, value) {
            var dom = document.getElementById(id);
            dom.style.color = color;
            dom.textContent = value;
        },
    addCSS3DLabelToScene() {
            var element = document.getElementById("WebGL-output");
            var element1 = document.getElementById("WebGL-output1");
            //把生成的CSSDOM对象处理成three的节点对象
            css3DObject = new CSS3DObject(element);
            css3DObject1 = new CSS3DObject(element1);
            //设置CSS3DObject对象
            css3DObject.position.x = 180;
            css3DObject.position.y = 0;
            css3DObject.position.z = 0;
            css3DObject1.position.x = -180;
            css3DObject1.position.y = 50;
            css3DObject1.position.z = 120;
            //在第二个场景中添加这个对象
            scene.add(css3DObject);
            scene.add(css3DObject1);
            // 默认不显示
            css3DObject.visible = false;
        },
    // onMouseClick(event) {
    //         console.log("===");
    //         const mousePoint = new THREE.Vector2();
    //         mousePoint.x = (event.clientX / window.innerWidth) * 2 - 1;
    //         mousePoint.y = -(event.clientY / window.innerHeight) * 2 + 1;
    //         const rayCaster = new THREE.Raycaster();
    //         rayCaster.setFromCamera(mousePoint, this.camera);
    //         let intersects = rayCaster.intersectObjects(scene.children, true);
    //         console.log(intersects);
    //         if (intersects.length > 0) {
    //             css3DObject.visible = true;
    //             css3DObject.position.x = intersects[0].object.position.x - 50 + 18;
    //             css3DObject.position.y = intersects[0].object.position.y + 50 + 38;
    //             css3DObject.position.z = intersects[0].object.position.z;


    //            this.modifyDocument("lableTitleWarning", "red", "报警信息: 温度过高");
    //            this. modifyDocument("lableTitleTemperature", "red", "温度: 120℃");
    //         } else {
    //             // css3DObject.visible = false;
    //         }
    //     },

    animate () {
      requestAnimationFrame(this.animate)
      orbitControls.update();
      labelRenderer.render(scene, this.camera);
      this.renderer.render(scene, this.camera)
    },  

    echartsConfig (options){
      options.color= ['#e7717b','#80FFA5'];
      options.series[0].lineStyle={
        width: 0
      };
      options.series[0].showSymbol=false;
      options.series[0].areaStyle={
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
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
    }
  },
  mounted () {
    this.initThree()
    this.animate() 
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .css_style {
            background-color: MidnightBlue;
            background-color: rgba(0, 10, 40);
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            opacity: 0.5;
            font-size: 4px;
            color: aqua;
            padding: 10px 10px 10px;
            white-space: nowrap;
        }

        .css_style:after {
            content: "";
            border-style: solid;
            border-top: 18px solid rgba(0, 10, 40);
            ;
            border-right: 8px solid transparent;
            border-bottom: 18px solid transparent;
            border-left: 8px solid transparent;
            /* border-left: 18px solid rgba(0, 10, 40); */
            ;
            position: absolute;
            /* left: 100%; */
            top: 100%;
            /* margin-top: 18px; */
            margin-right: 18px;
        }
        .css3dcontain{
            background-color: MidnightBlue;
            background-color: rgba(0, 10, 40);
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            opacity: 0.5;
            font-size: 4px;
            color: aqua;
            padding: 10px 10px 10px;
            white-space: nowrap;
        }
</style>
