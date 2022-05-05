<template>
  <HeaderPage/>
  <div class='casePage'>
    <div class='caseHeader'>
      <div class='wrapper goShow'>
        <h1>案例展示</h1>
        <p>客户是企业存在的基础，为客户创造价值、提供满意的服务是我们的一贯追求，更是公司持续发展的前提和保证。</p>
      </div>
    </div>
    <div class='nav'>
      <div class='wrapper'>
        <ul>
          <li v-for='(nav,index) in navs' :key='index' @click="showNav(nav,index)" :class="{active: this.currentIndex===index}">{{nav.title}}</li>
        </ul>
      </div>
    </div>
    <div class='product'>
      <div class='wrapper'>
        <router-link  v-for='(product,index) in products' :to="product.path" target="_blank" :key='index' class='productItem' :class="{isShow: this.currentgroup===product.group || this.currentgroup===''}">
          <img :src="require('../' + product.src)" />
          <h3>{{product.title}}</h3>
          <i class="icon iconfont icon-lianjie"></i>
        </router-link>
      </div>
    </div>
  </div>
  <FooterPage/>
  <ToTop/>
</template>
<script>
import HeaderPage from '@/components/HeaderPage'
import FooterPage from '@/components/FooterPage'
import ToTop from '@/components/ToTop'
export default {
  name: 'CasePage',
  components: {
    'HeaderPage': HeaderPage,
    'FooterPage': FooterPage,
    'ToTop': ToTop
  },
  data () {
    return {
      currentIndex:0,
      currentgroup:'',
      navs: [
        {
          title: '全部',
          group: ''
         },
        {
          title: '智慧园区',
          group: 'park'
         },
        {
          title: '智慧水利',
          group: 'draulic'
        },
        {
          title: '智慧能源',
          group: 'energy'
        }
      ],
      products:[
        {
          group:'park',
          title: '智慧园区',
          src: 'assets/yq.png',
          id: '01',
          path: '/model/insect' 
        },
        {
          group:'energy',
          title: '智慧能源',
          src: 'assets/ny.png',
          id: '02',
          path: '/model/granary' 
        },
        {
          group:'park',
          title: '智慧粮仓',
          src: 'assets/lc.png',
          id: '03',
          path: '/model/factory' 
        },
        {
          group:'draulic',
          title: '智慧水利',
          src: 'assets/water.png',
          id: '05',
          path: '/model/water' 
        },
        {
          group:'draulic',
          title: 'Cesium',
          src: 'assets/water.png',
          id: '06',
          path: '/model/earth' 
        }
      ]
    }
  },
  methods: {
    showNav (nav,index) {
      this.currentgroup=nav.group
      this.currentIndex=index
    }
  }
}
</script>
<style>
.caseHeader{
  width:100%;
  height:100vh;
  background:url(../assets/casebg.jpg) no-repeat center center;
  background-size: cover;
  color: #fffefe;
  padding-top:calc(50vh - 4rem);
}
.caseHeader .wrapper{
  padding-left:2rem;
}
.caseHeader h1{
  font-size:3rem;
  color: #fffefe;
  padding-left:1rem;
  position: relative;
  margin-bottom:2.3rem;
}
.caseHeader h1:before{
  content: "";
  display: block;
  height: 2.5rem;
  width: 0.4rem;
  background: #fffefe;
  border-radius: 4px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-40%);
}
.caseHeader p{
  width:50%;
  font-size:0.8rem;
  font-family: SimHei;
}
.nav{
  width: 100%;
  height: 70px;
  line-height: 70px;
  border-bottom: 1px solid #dbdbdb;
}
.nav li{
  margin-right:3rem;
  display: inline-block;
  cursor: pointer;
}
.nav li.active{
  color:blue;
}
.product{
  padding:2rem 0 1rem;
  background:white;
}
.product .wrapper{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  cursor: pointer;
}
.productItem{
  width:14rem;
  display:none;
  border: 1px solid #edf1f7;
  box-shadow: 0 0.2rem 0.3rem 0 #edf1f7;
  border-radius: 0.3rem;
  margin-bottom:1rem;
  position: relative;
}
.productItem.isShow{
  display:block;
}
.productItem img{
  width:100%;
  height:9rem;
  filter: blur(0);
}
.productItem h3{
  font-size:0.7rem;
  color:#0d0e0f;
  padding:0.5rem;
  margin:0;
}
.productItem .iconfont{
  font-size: 3rem;
  color: white;
  position: absolute;
  left:50%;
  top: 3rem;
  transform: translate(-50%,-1rem);
  display:none;
}
.productItem:hover .iconfont{
  display:block;
}
.productItem:hover img{
  filter: blur(0.1rem);
}
</style>