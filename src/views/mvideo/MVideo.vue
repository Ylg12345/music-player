<template>
  <div class="mvideo">
    <nav-scroll :topList="topList" @toggleItem="toggleItem"></nav-scroll>
    <scroll
    v-if="videoList.length !== 0"
    class="wrapper"
    :pullUpLoad=true 
    ref="scroll"
    @scrollToEnd="scrollToEnd" 
    :listenScroll=true 
    :scrollEnd=true>
      <video-item :videoList="videoList" :isShow="isShow"></video-item>
    </scroll>
  </div>
</template>

<script>

import {ERR_OK} from 'network/config'
import {mapMutations} from 'vuex'
import {getVideoCategoryList, getVideoRecommendList, getVideoGroup} from 'network/video'
import VideoItem from './childComponents/VideoItem'
import Scroll from 'components/common/scroll/Scroll'
import NavScroll from 'components/content/navscroll/NavScroll'

export default {
  components: {
    VideoItem,
    Scroll,
    NavScroll
  },
  data() {
    return {
      offset: 0,
      currentIndex: 0,
      topList: [],
      videoList: [],
      Item: {},
      isShow: true,
    }
  },
  created() {
    this._getVideoCategoryList()
    this._getVideoRecommendList()
  },
  methods: {
    ...mapMutations({
      setVideoList: 'SET_VIDEO_LIST'
    }),
    _getVideoCategoryList() {
      getVideoCategoryList().then(res => {
        if(res.code === ERR_OK) {
          this.topList = res.data.map((item) => {
            let topitem = {}
            topitem.name = item.name
            topitem.id = item.id
            return topitem
          })
          this.topList.unshift({
            name: '推荐'
          })
        }
      })
    },
    _getVideoRecommendList() {
      this.isShow = false
      getVideoRecommendList(this.offset).then(res => {
        if(res.code === ERR_OK) {
          this.videoList = this.videoList.concat(res.datas).map((item) => {
            if(item.data.vid) {
              return item
            }else if(item.data.id){
              return item
            }else {
              return
            }
          })
        }
      })
    },
    _getVideoGroup(id) {
      this.isShow = true
      getVideoGroup(id, this.offset).then(res => {
        if(res.code === ERR_OK) {
          this.videoList = this.videoList.concat(res.datas).map((item) => {
            if(item.data.vid) {
              return item
            }else if(item.data.id){
              return item
            }else {
              return
            }
          })
        }
      })
    },
    toggleItem(item, index) {
      this.Item = item
      this.currentIndex = index
      if(index === 0) {
        this._getVideoRecommendList()
      }
      if(!item.id) {
        return
      }
      this._getVideoGroup(item.id)
    },
    scrollToEnd() {
      this.pullingUp()
    },
    pullingUp() {
      this.offset++
      if(this.currentIndex === 0) {
        this._getVideoRecommendList()
      }
      if(this.currentIndex !== 0) {
        this._getVideoGroup(this.Item.id)
      }  
      this.$refs.scroll.scroll.finishPullUp()
      this.$refs.scroll.refresh()
    },
  },
  watch: {
    currentIndex(newIndex, oldIndex) {
      if(newIndex !== oldIndex) {
        this.offset = 0
        this.videoList = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mvideo {
  position: fixed;
  top: 44px;
  bottom: 0;
  width: 100%;
  .wrapper {
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
    margin-top: 5px;
    overflow: hidden;
  }
}
</style>