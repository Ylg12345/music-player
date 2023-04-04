<template>
  <div class="container border-bottom">
    <ul class="icons-wrapper">
      <!-- <li v-for="(item, index) in loginIcons" :key="index"
          :icons="item"
          is="icon"></li> -->
      <li class="icon-list" v-for="(item, index) in loginIcons" :key="index">
        <div class="icon">
          <i class="login" :class="item.icon"></i>
        </div>
        <span class="icon-text">{{item.text}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginIcons: [
        {
          icon: 'iconfont icon-message',
          text: '我的消息'
        }, 
        {
          icon: 'iconfont icon-friend',
          text: '我的好友'
        }, 
        {
          icon: 'iconfont icon-clothes',
          text: '个性皮肤'
        }, 
        {
          icon: 'iconfont icon-radio',
          text: '听歌识曲'
        }
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
.border-bottom {
  border-bottom: .1px solid #ccc;
}
.icons-wrapper {
  box-sizing: border-box;
  width: 100%;
  padding: 25px 6.5px 25px;
  display: flex;
  justify-content: space-around;
  .icon-list {
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      width: 36px;
      height: 36px;
      line-height: 36px;
      margin-bottom: 5px;
      .login {
        font-size: 24px;
        color: #dd001b;
      }
    }
    .icon-text {
      font-size: 12px;
    }
  }
}
</style>
