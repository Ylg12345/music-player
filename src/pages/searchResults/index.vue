<template>
  <div class="wrapper">
    <search-input :keyword="key"></search-input>
    <router-view :keywords="key"></router-view>
  </div>
</template>

<script>
import searchInput from '../search/components/SearchInput'


export default {
  components: {
    searchInput,
  },
  data () {
    return {
      key: ''
    }
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      this.key = to.params.id
    }
  },
  created () {
    this.setKey()
  },
  methods: {
    setKey () {
      this.key = this.$route.params.id
    }
  }
}
</script>

<style lang='scss' scoped>
.wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
}
.el-button--info {
  background: #fff;
  color: #000;
}
.btn {
  width: 100px;
  height: 50px;
}
.button {
  position: relative;
  overflow: hidden;
  user-select: none;
}
.button:after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  //设置径向渐变
  background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.3s, opacity 0.5s;
}
.button:active:after {
  transform: scale(0, 0);
  opacity: 0.3;
  //设置初始状态
  transition: 0s;
}
</style>
