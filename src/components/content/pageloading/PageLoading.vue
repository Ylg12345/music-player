<template>
  <div class="container">
    <div class="page-loading">
      <span class="span"></span>
      <span class="span"></span>
      <span class="span"></span>
      <span class="span"></span>
    </div>努力加载中...
  </div>
</template>

<script>
export default {
  name: 'pageLoading'
}
</script>

<style lang='scss' scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  line-height: 50px;
  z-index: 999;
}
.page-loading {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 25px;
  margin-right: 10px;
  .span {
    width: 2.5px;
    height: 10px;
    background-color: #dd001b;
  }

  .span:nth-of-type(1) {
    animation: grow 1s -0.45s ease-in-out infinite;
  }

  .span:nth-of-type(2) {
    animation: grow 1s -0.3s ease-in-out infinite;
  }

  .span:nth-of-type(3) {
    animation: grow 1s -0.15s ease-in-out infinite;
  }

  .span:nth-of-type(4) {
    animation: grow 1s ease-in-out infinite;
  }

  @keyframes grow {
    0%,
    100% {
      transform: scaleY(1);
    }

    50% {
      transform: scaleY(2);
    }
  }
}
</style>
