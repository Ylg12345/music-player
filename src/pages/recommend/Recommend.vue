<template>
  <div class="recommend" ref="recommend">
    <pages-nav title="歌单广场"></pages-nav>
    <nav-scroll :topList="CatNavList" @toggleItem="toggleItem"></nav-scroll>
    <!-- <div class="wrapper">
      <div class="recommend-header">
        <div class="header-item" v-for="(item, index) in CatNavList" :class="{active: index === currentIndex }" @click="toggleItem(index)">
          <span>{{item}}</span>
        </div>
      </div>
    </div> -->
    <scroll 
    class="scroll" 
    :pullUpLoad=true 
    ref="scroll"
    :data="playlists" 
    @scrollToEnd="scrollToEnd" 
    :listenScroll=true 
    :scrollEnd=true>
      <router-view :playlists="playlists" :isShowTop=false class="disclist" :probeType=3></router-view>
    </scroll>
  </div>
</template>

<script>

import {getCatList,getHotCatList} from 'network/find'
import {ERR_OK} from 'network/config'

import Scroll from 'components/common/scroll/Scroll'
import PagesNav from 'components/common/pagesnav/PagesNav'
import NavScroll from 'components/content/navscroll/NavScroll'

export default {
  components: {
    PagesNav,
    Scroll,
    NavScroll
  },
  data() {
    return {
      CatNavList: ['全部', '欧美', 'ACG', '日语', '校园', '游戏', '电子', '民谣', '轻音乐', '摇滚'],
      currentIndex: 0,
      cat: '',
      playlists: [],
      limit: 30
    }
  },
  created() {
    this._getHotCatList()
  },
  methods: {
    _getHotCatList(cat) {
      getHotCatList(cat, this.limit).then(res => {
        if(res.code === ERR_OK) {
          this.playlists = res.playlists
        }
      })
    },
    toggleItem(item, index) {
      this.currentIndex = index
      this.$router.push({
        path: `/recommend/${this.CatNavList[index]}`
      })
      this.limit = 30
      this._getHotCatList(this.CatNavList[index])
      this.$refs.scroll.scrollTo(0, 0, 0)
    },
    pullingUp() {
      this.limit += 30
      this._getHotCatList(this.CatNavList[this.currentIndex])
      this.$refs.scroll.scroll.finishPullUp()
      this.$refs.scroll.refresh()
    },
    scrollToEnd() {
      this.pullingUp()
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 5;
  background: #fff;
/*   .wrapper {
    width: 100%;
    .recommend-header {
      width: 100%;
      display: flex;
      justify-content: space-around;
      width: 375px;
      box-sizing: border-box;
      margin-top: 8px;
      border-bottom: 1px solid #ddd;
      .header-item {
        width: 65px;
        height: 35px;
        box-sizing: border-box;
        padding: 1.5px;
        margin: 0 8px;
        display: flex;
        align-items: center;
        justify-content: center;      
        span {
          font-size: 14px;
        }
      }
      .active {
        border-bottom: 2px solid #dd001b;;
      }
    }
  } */
  .scroll {
    width: 100%;
    height: calc(100% - 95px);
    overflow: hidden;
    .disclist {
      padding-top: 15px;
    }
  }
}
</style>