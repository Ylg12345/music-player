<template>
  <div class="wrapper pd23">
    <!-- 左边的返回箭头 -->
    <i class="iconfont icon-back" @click="returnPage"></i>
    <!-- input 框，设置使得 input 页面加载input自动聚焦 -->
    <!-- 聚焦后显示搜索建议 -->
    <input
      class="search"
      type="text"
      :placeholder="placeholder"
      ref="inp"
      autofocus="autofocus"
      v-model.trim="keywords"
      @focus="displayList"
    />
    <!-- 通过观测输入框中是否有内容用来控制右侧的叉按钮是否显示 -->
    <!-- 为叉按钮定义点击事件，点击清空输入框 -->
    <i v-show="keywords" @click="clearInp" class="iconfont icon-cancel" :style="{right: Right}"></i>
        <i class="iconfont icon-singer" v-if="page" @click="goSingerPage"></i>
    <!-- 搜索建议列表信息 -->
    <div class="floatInfo" v-show="showList">
      <ul>
        <li @click="searchKey(keywords)" class="blue border-bottom">
          搜索
          <span class="text">"{{ keywords }}"</span>
        </li>
        <li
          @click="searchKey(item.keyword)"
          class="border-bottom"
          v-for="(item, index) in searchList"
          :key="index"
        >
          <i class="iconfont icon-search"></i>
          {{ item.keyword }}
        </li>
      </ul>
    </div>
    <!-- 蒙层，当搜索建议显示，蒙层显示，控制列表不能滚动 -->
    <div class="mask" v-show="showList" @click="hideList"></div>  
  </div>
</template>

<script>
import { defaultSearch, suggestSearch } from 'network/search'
import Bus from 'common/js/bus'
export default {
  props: {
    page: {
      type: String
    },
    Right: {
      default: '11.5px'
    },
    keyword: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      searchList: [],
      keywords: '',
      showList: false,
      // 将 history 存入 vuex
      history: [],
      // 防抖定时器
      time: null,
      placeholder: ''
    }
  },
  created () {
    // 获取焦点
    this.changFocus()
    // 先将默认搜索建议显示
    this._getPlaceholder()
    // 历史记录项点击搜索
    this.historySearch()
    // 页面首次加载，由于 keyword 没有被watch监听，所以使用函数方法进行赋值
    this.setKeyword()
  },
  mounted () {
    // 获取历史搜索记录
    this.getHistory()
  },
  watch: {
    /**
     * 是否显示搜索建议
     */
    keywords: function (val, oldVal) {
      // 这是对于输入框内容定义的事件，当是跳转过来的
      // 说明内容相等，不显示搜索建议列表
      if (this.keywords === this.keyword) {
        this.hideList()
        return
      }
      // 在内容变化时，并且当内容长度大于0 说明有内容时
      if (this.keywords.length > 0) {
        // 显示建议列表
        this.displayList()
      } else {
        // 隐藏建议列表
        this.hideList()
      }
    },
    // 对于prop传过来的值，在第一次使用方法进行修改，随后监听keyword变化，对搜索内容进行修改
    keyword: function (val, oldVal) {
      if (val) {
        this.keywords = val
      }
    }
  },
  methods: {
    /**
     * 第一次访问需要调用方法更改数据
     * 随后是监听 keyword 改变后赋值
     */
    setKeyword () {
      if (this.keyword) {
        this.keywords = this.keyword
      }
    },
        /**
     * 点击歌手分类图标，跳转到歌手分类页面
     */
    goSingerPage () {
      this.$router.push('/singer')
    },
    /**
     * 历史记录项目点击搜索
     */
    historySearch () {
      Bus.$on('search', (keywords) => {
        this.searchKey(keywords)
      })
    },
    /**
     * 点击清除按钮清除搜索框的内容
     */
    clearInp () {
      this.keywords = ''
    },
    /**
     * 自动获取焦点
     * 当是搜索展示页时不自动获取焦点
     */
    changFocus () {
      if (!this.keyword) {
        this.$nextTick(x => {
          this.$refs.inp.focus()
        })
      }
    },
    /**
     * 返回上一页
     */
    returnPage () {
      this.$router.go(-1)
    },
    /**
     * 设置输入框的默认显示
     */
    _getPlaceholder () {
      defaultSearch()
        .then(res => {
          if (res.code === 200) {
            this.placeholder = res.data.showKeyword
          }
        })
    },
    /**
     * 隐藏搜索建议列表
     */
    hideList () {
      this.showList = false
    },
    /**
     * 显示搜索列表建议
     */
    displayList () {
      if (!this.keywords) {
        return
      }
      this.showList = true
      // 搜索建议列表内容获取
      this.setSearchList(this.keywords)
    },
    /**
     * 请求搜索建议数据
     */
    _getSuggestList (keyword) {
      suggestSearch(keyword)
        .then(res => {
          if (res.code === 200) {
            this.searchList = res.result.allMatch
          }
        })
    },
    /**
     * 根据搜索内容展示搜索建议列表
     * 使用防抖
     */
    setSearchList (keywords) {
      if (this.time) {
        clearTimeout(this.time)
        this.time = null
      }
      this.time = setTimeout(() => {
        this._getSuggestList(keywords)
      }, 50)
    },
    /**
     * 获取历史搜索记录
     */
    getHistory (key) {
      let keys = localStorage.getItem('keys') ? localStorage.getItem('keys').split(',') : []
      if (key) {
        // 将关键字插入到数组最前面
        keys.unshift(key)
        // 存入本地之前进行去重
        keys = this.unique(keys)
        // 存入本地
        localStorage.setItem('keys', keys)
      }
      this.history = keys
      // 通过Bus 进行兄弟组件之间传值
      // 通过 Bus.$emit('方法名',要传的值)
      Bus.$emit('history', this.history)
    },
    /**
     * 向导航标签传递key值
     */
    pushKey (key) {
      this.$nextTick(() => {
        // DOM 现在更新了
        Bus.$emit('push', key)
      })
    },
    /**
     * 搜索
     * 搜索功能跳转到搜索展示页面
     */
    searchKey (key) {
      this.getHistory(key)
      this.hideList()
      this.clearInp()
      // 这里解决了Bus传值第一次无法获取到的问题
      // 后需解决！！！！
      setTimeout(() => {
        this.pushKey(key)
      }, 0)
      this.$router.push({
        path: `/composite/${key}`
      })
    },
    /**
     * 数组去重
     */
    unique (arr) {
      if (!Array.isArray(arr)) {
        console.log('type error!')
        return
      }
      return Array.prototype.filter.call(arr, function (item, index) {
        return arr.indexOf(item) === index
      })
    },
    beforeDestroy () {
      // 销毁监听事件
      this.$Bus.$off('push', 'history')
    }
  }
}
</script>

<style lang="scss" scoped>
.pd23 {
  box-sizing: border-box;
  padding: 0 11.5px;
}
.wrapper {
  display: flex;
  justify-content: space-between;
  height: 35px;
  line-height: 35px;
  position: relative;
  margin-bottom: 10px;
  z-index: 5;
  .icon-cancel {
    position: absolute;
    right: 11.5px;
  }  
  .icon-singer {
    margin-left: 15px;
  }
  .iconfont {
    font-size: 25px;
  }
  .search {
    flex: 1;
    margin-left: 15px;
    border-bottom: 1px solid #aaa !important;
    outline: none;
    background-color: transparent;
    border: 0;
  }
  .floatInfo {
    width: 285px;
    position: absolute;
    top: 40px;
    box-shadow: 0 4px 16px #aaa;
    background-color: #fff;
    z-index: 2;
    box-sizing: border-box;
    padding: 0 11.5px;
    li {
      height: 40px;
      line-height: 40px;
      color: #888;
      .text {
        margin-left: 8px;
      }
      .iconfont {
        font-size: 20px;
        vertical-align: -2px;
      }
    }
    .blue {
      color: #38f;
    }
  }
  .mask {
    position: fixed;
    top: 35px;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    opacity: 0;
  }
}
</style>
