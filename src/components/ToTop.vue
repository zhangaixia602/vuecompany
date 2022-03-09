<template>
    <div class="suspension_box">
      <ul>
        <li class="textCenter">
          <i class="icon iconfont icon-dianhua"></i>
          <div>0755-8326-9919</div>
        </li>
        <li class="textCenter">
          <i class="icon iconfont icon-xiaoxi"></i>
          <div></div>
        </li>
        <li class="textCenter" @click="goTop">
          <i class="icon iconfont icon-dingbu"></i>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'ToTop',
  methods: {
    goTop () {
      if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      }
    }
  }
}
</script>
