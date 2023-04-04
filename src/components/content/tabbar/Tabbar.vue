<template>
  <div class="tabbar">
    <div class="nav-left" @click="showLogin">
      <i class="iconnav"><img src="~common/img/菜单.svg"></i>
    </div>
    <div class="tabbar-wrapper">
      <router-link tag="div" class="tab-item" to="/profile">
        <span class="tab-link">我的</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/find">
        <span class="tab-link">发现</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/singer">
        <span class="tab-link">歌手</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/mvideo">
        <span class="tab-link">视频</span>
      </router-link>
    </div>
    <div class="nav-right" @click="enterSearch">
      <i class="iconsousuo"><img src="~common/img/搜索.svg"></i>
    </div>
    <login-show></login-show>
  </div>
</template>

<script>

import {mapMutations} from 'vuex'
import LoginShow from 'components/content/loginshow/LoginShow'

export default {
  components: {
    LoginShow,
  },
  methods: {
    ...mapMutations({
      setloginshow: 'SET_LOGIN_SHOW'
    }),
    showLogin() {
      this.setloginshow(true)
    },
    enterSearch() {
      this.$router.push('/search')
    }
  }
}
</script>

<style lang="scss" scoped>
.tabbar {
  position: relative;
  height: 44px;
  .nav-left {
    position: absolute;
    left: 25px;
    top: 10px;
    .iconnav {
      img {
        width: 19px;
        height: 19px;
      }
    }
  }
  .tabbar-wrapper {
    padding-top: 13px;
    margin: 0 auto;
    width: 60%;
    display: flex;
    justify-content: space-around;
    .tab-item {
      font-size: 13px;
      color: rgb(122, 118, 118);
      &.router-link-active {
        .tab-link {
          font-size: 15px;
          color: #000;
        }
      }
    }
  }
  .nav-right {
    position: absolute;
    right: 25px;
    top: 11px;
    .iconsousuo {
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>