<template>
  <div id="app">
    <my-tabbar></my-tabbar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>

import MyTabbar from 'components/content/tabbar/Tabbar'
import Player from 'components/content/player/Player'

export default {
  name: 'App',
  components: {
    MyTabbar,
    Player
  }
}
</script>

<style lang="scss" scoped>
#app {
  height: 100vh;
  width: 100vw;
}
</style>
