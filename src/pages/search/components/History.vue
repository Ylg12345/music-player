<template>
 <div class="history pd23" v-if="history.length">
   <div class="history-title">
     <span>历史记录</span>
     <i class="search iconfont icon-cancel" @click="clearHistory"></i>
   </div>
   <div class="wrapper">
    <div class="container ">
      <ul class="icons-group">
        <li class="icon-list"
            @click="toSearch(item)"
            v-for="(item, index) in history"
            :key="index">{{item}}
        </li>
      </ul>
    </div>
  </div>
 </div>
</template>

<script>
import Bus from 'common/js/bus'
export default {
  data () {
    return {
      history
    }
  },
  created () {
    this.getHistory()
  },
  methods: {
    /**
     * 获取历史记录
     */
    getHistory () {
      // 兄弟组件进行值的接收
      // Bus.$on('方法名(与兄弟组件方法名一致), 回调函数 参数为传过来的值')
      Bus.$on('history', (history) => {
        this.history = history
      })
    },
    /**
     * 清除历史记录
     */
    clearHistory () {
      localStorage.removeItem('keys')
      this.history = []
    },
    toSearch (keywords) {
      Bus.$emit('search', keywords)
    }
  }
}
</script>

<style lang='scss' scoped>
.history{
  margin-top: 25px;
  .history-title{
    box-sizing: border-box;
    padding: 0 11.5px;
    height: 40px;
    line-height: 40px;
    position: relative;
    .icon-cancel{
      width: 40px;
      height: 40px;
      text-align: center;
      font-size: 20px;
      position: absolute;
      right: 0;
    }
  }
  .wrapper {
    box-sizing: border-box;
    overflow: hidden;
    height: 25px;
    // 定义可左右滑动的图标组
    .container {
      // 横向滚动条
      overflow-x: scroll;
      .icons-group {
        // flex布局 溢出不换行
        height: 25px;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        white-space: nowrap;
        width: auto;
        min-width: 100%;
        .icon-list {
          height: 22px;
          box-sizing: border-box;
          padding: 0 6.5px;
          font-size: small;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 5px;
          border-radius: 15px;
          background: #eee;
        }
      }
    }
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
