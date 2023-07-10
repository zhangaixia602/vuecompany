<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="text-center avatar-box">
        <img src="../assets/logo.png" class="img-thumbnail avatar" alt="" />
      </div>
 
      
      <!-- 表单区域 -->  

      <div class="form-login p-4">
        <!-- 登录名称 -->
        <div class="form-group form-inline">
          <!-- <label for="username">登录名称</label> -->
          <a-input class="form-control" v-model:value="username">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input> 
        </div>
        <!-- 登录密码 -->
        <div class="form-group form-inline">
          <!-- <label for="password">登录密码</label> -->
         <a-input-password class="form-control" v-model:value="password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
       </a-input-password>
        </div>
        <!-- 登录和重置按钮 -->
        <div class="form-group form-inline d-flex justify-content-end">
          <button type="button" class="btn btn-primary" @click="login">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
export default {
  name: 'MyLogin',
   components: {
    UserOutlined,
    LockOutlined,
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {    
    login() {
      if (this.username === 'admin' && this.password === '666666') {
        // 登录成功
        // 1. 存储 token
        localStorage.setItem('token', 'Bearer xxxx')
        // 2. 跳转到后台主页
        
         window.location = 'https://share.shanhaibi.com/62d669f63eac4/';
        // this.$router.push('/case')
      } else if(this.username === 'dyh' && this.password === '123456'){
         window.location = 'https://share.shanhaibi.com/019bd1ed9c-NGMyNGEzZT/yubeigongyeyuan/';

      }else {
        // 登录失败
        localStorage.removeItem('token')
        Modal.warning({
        title: '提示',
        content: '用户名输入错误，重新输入',
      });
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  background-color: #35495e;
  height: 100%;
 
 
}
 .login-box {
    width: 500px;
    height: 250px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 6px rgba(3 58 251 / 50%);
   
  }
.form-control {
    width: 400px;
    border-radius: 5px;
    margin: 10px 0px 10px 0px;
}
 .form-login {
      position: absolute;
      margin: 50px;
      box-sizing: border-box;
    }

.avatar-box {
  position: absolute;
  width: 100%;
  top: -65px;
  left: 35%;
 
}
 .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50% !important;
    box-shadow: 0 0 6px #efefef;
  }
  .btn{
    width: 400px;
    margin: 10px 0px 10px 0px;
    background-color: #096dd9;
    border-radius: 10px;
    color:#FFFFFF;
  }
</style>

