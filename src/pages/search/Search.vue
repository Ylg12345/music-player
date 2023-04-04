<template>
  <div class="search">
    <search-input ref="search" page="search" Right="50px"></search-input>
    <scroll class="scroll">
      <history v-show="!loading"></history>
      <!-- 父组件在组件上定义了一个自定义事件childFn，事件名为parentFn用于接受子组件传过来的message值。 -->
      <hot-search v-show="!loading" @returnKey = "setKey" @childFn="parentFn"></hot-search>
      <page-loading v-if="loading"></page-loading>
    </scroll>
  </div>
</template>

<script>

import SearchInput from './components/SearchInput'
import history from './components/History'
import hotSearch from './components/HotSearch'
import PageLoading from 'components/content/pageloading/PageLoading'
import Scroll from 'components/common/scroll/Scroll'

export default {
  components: {
    SearchInput,
    history,
    hotSearch,
    PageLoading,
    Scroll
  },
  data() {
    return {
      hotSearchKey: '',
      loading: true
    }
  },
  activated () {
    this.setKey()
  },
  methods: {
    setKey (key) {
      if (key) {
        // 父组件调用子组件方法
        this.$refs.search.searchKey(key)
      }
    },
    parentFn (result) {
      this.loading = result
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  .scroll {
    height: calc(100% - 35px);
    overflow: hidden;
  }
}
</style>