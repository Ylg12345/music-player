<template>
  <div class="wrapper">
    <login-nav :title="text"></login-nav>
    <slot></slot>
  </div>
</template>

<script>
import loginNav from 'components/common/pagesnav/PagesNav'

export default {
  name: 'loginIndex',
  components: {
    loginNav
  },
  data () {
    return {
      text: '手机号登录'
    }
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
}
.text {
  font-size: 20px;
  vertical-align: 5px;
}
</style>
