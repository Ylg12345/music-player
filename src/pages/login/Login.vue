<template>
  <div class="login-menu">
    <login-top :loginState="loginState"></login-top>
    <login-icons></login-icons>
    <login-icons-content></login-icons-content>
    <login-bottom @logout="logout"></login-bottom>
  </div>
</template>

<script>

import {logoutFn} from 'network/login'
import {mapMutations, mapGetters} from 'vuex'
import LoginTop from './childComponents/LoginTop'
import LoginIcons from './childComponents/loginIcons'
import LoginIconsContent from './childComponents/LoginIconsContent'
import LoginBottom from './childComponents/LoginBottom'

export default {
  components: {
    LoginTop,
    LoginIcons,
    LoginIconsContent,
    LoginBottom,
  },
  date() {
    return {

    }
  },
  computed: {
    loginState() {
      return +localStorage.getItem('loginState')
    }
  },
  methods: {
    ...mapMutations({
      setloginstate: 'SET_LOGIN_STATE'
    }),

    logout() {
      logoutFn().then(res => {
        if (res.code === 200) {
          localStorage.setItem('loginState', 0)
          this.setloginstate(0)
          location.reload()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-menu {
  // 左侧侧边栏 宽度设置为6rem
  position: absolute;
  z-index: 10;
  height: 100vh;
  overflow-y: auto;
  top: 0;
  left: 0;
  width: 300px;
  background: #fff;
}
</style>