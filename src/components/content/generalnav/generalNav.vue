<template>
  <nav class="phone-nav" ref="nav" :class="{height: height === 'all'}">
    <i class="iconfont icon-back" @click="returnPage"></i>
    <slot></slot>
  </nav>
</template>

<script>
export default {
  props: {
    nav: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: 'all'
    }
  },
  methods: {
    visible () {
      this.$refs.nav.style.visibility = 'visible'
    },
    hidden () {
      this.$refs.nav.style.visibility = 'hidden'
    },
    returnPage () {
      this.$emit('returnPage')
    }
  }
}
</script>

<style lang="scss" scoped>

.phone-nav {
  display: flex;
  align-items: center;
  &.height {
    line-height: 44px;
    height: 44px;
  }
  .iconfont {
    font-size: 30px;
    margin-right: 5px;
    color: #fff;
  }
}
</style>
