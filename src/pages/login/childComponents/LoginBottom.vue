<template>
  <div class="wrapper border-top">
    <span>
      <i class="login iconfont icon-moon"></i>
      <!-- 在 vue 中，通过 v-once 指令，可以有效提高静态内容展示效率 -->
      <span>夜间模式</span>
    </span>
    <span>
      <i class="login iconfont icon-install"></i>
      <span>设置</span>
    </span>
    <span @click="logout">
      <i class="login iconfont icon-exit"></i>
      <span>退出</span>
    </span>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$emit('logout')
    },
  }
}
</script>

<style lang="scss" scoped>
.border-top {
  border-top: .1px solid #ccc;
}
.wrapper {
  width: 300px;
  height: 45px;
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px 11.5px;
  position: fixed;
  bottom: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  .login {
    font-size: 20px;
    vertical-align: -2px;
    margin-right: 4px;
  }
}
</style>
