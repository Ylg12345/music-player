<template>
  <div>
    <transition name="mask-show">
      <div class="mask" v-show="loginshow" @click="hideLogin" @touchmove.prevent></div>
    </transition>
    <transition name="login-show">
      <login v-show="loginshow" @touchmove.prevent></login>
    </transition>
  </div>
</template>

<script>

import {mapMutations, mapGetters} from 'vuex'
import Login from '@/pages/login/Login'

export default {
  components: {
    Login,
  },
  computed: {
    ...mapGetters([
      'loginshow'
    ])
  },
  methods: {
    ...mapMutations({
      setloginshow: 'SET_LOGIN_SHOW'
    }),
    hideLogin() {
      this.setloginshow(false)
    }
  }
}
</script>

<style lang="scss" scoped>
// 遮罩层
.mask {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
}
// 遮罩层动画
.mask-show-enter,
.mask-show-leave-to {
  opacity: 0;
}

.mask-show-enter-active,
.mask-show-leave-active {
  transition: opacity linear 0.3s;
}
// 左侧侧边栏显示隐藏动画
.login-show-enter,
.login-show-leave-to {
  transform: translateX(-300px);
}

.login-show-enter-active,
.login-show-leave-active {
  transition: transform linear 0.3s;
}
</style>