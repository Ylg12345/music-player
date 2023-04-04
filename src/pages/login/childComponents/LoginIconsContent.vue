<template>
  <div class="wrapper pd23 border-bottom">
    <ul>
      <li class="list" v-for="(item, index) in loginIconsTop" :key="index">
        <i class="login" :class="item.icon"></i>
        <span class="list-text">{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  data () {
    return {
      loginIconsTop: [
        {
          icon: 'iconfont icon-test',
          text: '音乐闹钟'
        }, 
        {
          icon: 'iconfont icon-richscan',
          text: '扫一扫'
        }, 
        {
          icon: 'iconfont icon-location',
          text: '附近的人'
        }, 
        {
          icon: 'iconfont icon-ring',
          text: '口袋铃声'
        },
        {
          icon: 'iconfont icon-shopping',
          text: '商城'
        },
        {
          icon: 'iconfont icon-piao',
          text: '我的订单'
        }
      ]
    }
  },
}
</script>


<style lang="scss" scoped>
.pd23 {
  box-sizing: border-box;
  padding: 0 11.5px
}
.wrapper{
  padding-top: 10px;
  padding-bottom: 10px;
  .list{
    box-sizing: border-box;
    padding: 10px 0;
    font-size: 14px;
    height: 43.5px;
    .login{
      font-size: 20px;
      margin-right: 30px;
      vertical-align: -3px;
    }
  }
}
</style>
