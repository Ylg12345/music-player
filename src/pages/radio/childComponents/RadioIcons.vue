<template>
  <ul class="icons-wrapper">
    <li class="find-recommend-item" v-for="(item, index) in loginIcons" :key="index">
      <div class="icon">
        <i class="login" :class="item.icon"></i>
      </div>
      <span class="icon-text">{{item.text}}</span>
    </li>
  </ul>

</template>

<script>
export default {
  data () {
    return {
      loginIcons: [
        {
          icon: 'iconfont icon-classify',
          text: '电台分类'
        }, 
        {
          icon: 'iconfont icon-rank',
          text: '电台排行'
        }, 
        {
          icon: 'iconfont icon-payment',
          text: '付费精品'
        }, 
        {
          icon: 'iconfont icon-book',
          text: '主播学院'
        }
      ]
    }
  },
}
</script>

<style lang="scss" scoped>

.icons-wrapper {
  position: relative;
  width: 100%;
  height: 95px;
  display: flex;
  justify-content: space-between;
  padding: 10px 5px 15px 15px;
  box-sizing: border-box;
  border-bottom: .5px solid #ccc;
  .find-recommend-item {
    display: flex;
    height: 80px;
    width: 60px;
    justify-content: center;
    position: relative;
    .icon {
      height: 40px;
      width: 40px;
      background-color: red;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .login {
        font-size: 24px;
        color: #fff;
      }
    }
    .icon-text {
      position: absolute;
      color: #000;
      font-size: 13px;
      display: block;
      bottom: 10px;
      letter-spacing: 1px;
    }
  }
}
</style>
