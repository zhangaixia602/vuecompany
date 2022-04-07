<template>
  <div id="threeLoader">
  </div>
</template>
<script>
import * as Three from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
let scene = null
export default {
  name: 'EnvironmentPage',
  methods: {
    initThree () {
      let threeLoader = document.getElementById('threeLoader')
      let width = window.innerWidth
      let height = window.innerHeight
      this.renderer = new Three.WebGL1Renderer({antialias: true})
      this.renderer.setSize(width, height)
      this.renderer.setPixelRatio(window.devicePixelRatio);
      threeLoader.appendChild(this.renderer.domElement)      
   
      scene = new Three.Scene()

      let materials=[];
      let texturepx=new Three.TextureLoader().load('/static/models/lc/px.jpg');
      let meshBaeicMaterialPx=new Three.MeshBasicMaterial({map:texturepx});
      let texturenx=new Three.TextureLoader().load('/static/models/lc/nx.jpg');
      let meshBaeicMaterialNx=new Three.MeshBasicMaterial({map:texturenx});
      let texturepy=new Three.TextureLoader().load('/static/models/lc/py.jpg');
      let meshBaeicMaterialPy=new Three.MeshBasicMaterial({map:texturepy});
      let textureny=new Three.TextureLoader().load('/static/models/lc/ny.jpg');
      let meshBaeicMaterialNy=new Three.MeshBasicMaterial({map:textureny});
      let texturepz=new Three.TextureLoader().load('/static/models/lc/pz.jpg');
      let meshBaeicMaterialPz=new Three.MeshBasicMaterial({map:texturepz});
      let texturenz=new Three.TextureLoader().load('/static/models/lc/nz.jpg');
      let meshBaeicMaterialNz=new Three.MeshBasicMaterial({map:texturenz});
      materials.push(meshBaeicMaterialPx);
      materials.push(meshBaeicMaterialNx);
      materials.push(meshBaeicMaterialPy);
      materials.push(meshBaeicMaterialNy);
      materials.push(meshBaeicMaterialPz);
      materials.push(meshBaeicMaterialNz);
      let mesh = new Three.Mesh(new Three.BoxBufferGeometry(100,100,100), materials);//网络模型对象Mesh
      mesh.geometry.scale(1,1,-1);
      scene.add(mesh);//网络模型添加到场景中
      this.camera = new Three.PerspectiveCamera(90, width / height, 0.1, 100)
      this.camera.position.set(0, 0, 0)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      
      window.addEventListener('resize',this.onWindowResize,false)

      let bMouseDown=false;
      let x=-1;
      let y=-1;
      threeLoader.onmousedown=function(event){
        event.preventDefault();
        x=event.clientX;
        y=event.clientY;
        bMouseDown=true;
      }
      threeLoader.onmouseup=function(event){
        event.preventDefault();
        bMouseDown=false;
      }
      threeLoader.onmousemove=function(event){
        event.preventDefault();
        if(bMouseDown){
                mesh.rotation.y+=-0.005*(event.clientX-x);
                mesh.rotation.x+=-0.005*(event.clientY-y);
                if(mesh.rotation.x>Math.PI/2){
                    mesh.rotation.x=Math.PI/2
                }
                if(mesh.rotation.x<-Math.PI/2){
                    mesh.rotation.x=-Math.PI/2
                }
                x=event.clientX;
                y=event.clientY;
            }
      }
      threeLoader.onmousewheel=function(event){
            event.preventDefault();
            if(event.wheelDelta!=0){
                this.camera.fov+=event.wheelDelta>0 ? 1 : -1;
                if(this.camera.fov>150){
                    this.camera.fov=150;
                }else if(this.camera.fov<30){
                    this.camera.fov=30;
                }
                this.camera.updateProjectionMatrix();
            }
      }

      let loader = new GLTFLoader()
      loader.load('/static/models/Bee.glb', (glb) => {
        scene.add(glb.scene)
        scene.scale.set(0.2,0.2,0.2)
      })
    },
    onWindowResize () {
      this.camera.aspect=window.innerWidth/window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth.window.innerHeight)
    },
    animate () {
      requestAnimationFrame(this.animate)
      this.renderer.render(scene, this.camera)
    }
  },
  mounted () {
    this.initThree()
    this.animate()
  }
}
</script>