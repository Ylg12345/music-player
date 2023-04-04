<template>
  <div class="wrapper" :class="{loginBg:!loginState}">
    <!-- 没有登录状态样式 -->
    <div class="no-login" v-if="!loginState">
      <div class="content">
        <p>登陆网易云音乐</p>
        <p>手机电脑多端同步，尽享海量高品质音乐</p>
      </div>
      <!-- 在一个组件的根元素上直接监听一个原生事件 使用native修饰-->
      <router-link to="/login" tag="button" class="to-login" @click.native="hideLogin">立即登录</router-link>
    </div>
    <!-- 已经登陆状态样式 -->
    <div class="login-ed" v-if="loginState">
      <div class="img-info">
        <img class="account-bg" :src="avatarUrl" alt />
      </div>
      <div class="nickname">
        <span class="account-nickname">{{nickname}}</span>
        <span class="level">Lv.{{level}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  data () {
    return {
      avatarUrl: '',
      nickname: '',
      is_Sign: false,
      level: 0
    }
  },
  props: {
    loginState: {
      type: Number,
      default: 0
    }
  },
  created () {
    this.$nextTick(() => {
      console.log(this.loginState)
      this.getUserInfo(this.loginState)
    })
  },
  methods: {
    ...mapMutations({
      setloginshow: 'SET_LOGIN_SHOW'
    }),
    hideLogin() {
      this.setloginshow(false)
    },
    getUserInfo (bool) {
      if (bool) {
        // 通过本地存储获取用户头像和昵称
        this.level = localStorage.getItem('level')
        this.avatarUrl = localStorage.getItem('avatarUrl')
        this.nickname = localStorage.getItem('nickname')
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.loginBg {
  // 如果没有登陆，背景是灰色
  background-color: rgba(204, 204, 204, 0.3);
}
.wrapper {
  // 左侧上部大背景
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  padding: 30px 11.5px 25px;
  width: 100%;
  height: 120px;
  .login-ed {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    .nickname {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 70%;
/*       position: absolute;
      bottom: 0; */
      .account-nickname {
        font-size: 13.5px;
        margin-right: 5px;
      }
      .level {
        box-sizing: border-box;
        padding: 2px 5px;
        background-color: #ccc;
        border-radius: 20px;
        font-size: 9px;
      }
    }
    .img-info {
      // 用户信息 包括头像和昵称
      text-align: center;
      width: 65px;
      height: 65px;
      .account-bg {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  .no-login {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    .content {
      text-align: center;
      p {
        // 两句话
        font-size: 10px;
        line-height: 15px;
        color: rgba(0, 0, 0, 0.4);;
      }
    }
    .to-login {
      // 立即登录按钮
      background-color: transparent;
      box-sizing: border-box;
      padding: 5px 25px;
      border: 1px solid rgba(0, 0, 0, 0.4);;
      border-radius: 25px;
      font-size: 10px;
      color: rgba(0, 0, 0, 0.4);
    }
  }
}
</style>
