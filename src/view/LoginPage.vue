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
          <input
            type="text"
            class="form-control ml-2"
            id="username"
            placeholder="请输入登录名称"
            autocomplete="off"
            v-model.trim="username"
          />
        </div>
        <!-- 登录密码 -->
        <div class="form-group form-inline">
          <!-- <label for="password">登录密码</label> -->
          <input
            type="password"
            class="form-control ml-2"
            id="password"
            placeholder="请输入登录密码"
            v-model.trim="password"
          />
        </div>
        <!-- 登录和重置按钮 -->
        <div class="form-group form-inline d-flex justify-content-end">
          <button type="button" class="btn btn-secondary mr-2" @click="reset">重置</button>
          <button type="button" class="btn btn-primary" @click="login">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyLogin',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    reset() {
      this.username = ''
      this.password = ''
    },
    login() {
      if (this.username === 'admin' && this.password === '666666') {
        // 登录成功
        // 1. 存储 token
        localStorage.setItem('token', 'Bearer xxxx')
        // 2. 跳转到后台主页
        
         window.location = 'https://share.shanhaibi.com/62c6540009880/';
        // this.$router.push('/case')
      } else if(this.username === 'admin001' && this.password === '123456'){
         window.location = 'https://share.shanhaibi.com/62c6915ae2874/';

      }else {
        // 登录失败
        localStorage.removeItem('token')
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
    margin: 5px 0px 5px 0px;
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

