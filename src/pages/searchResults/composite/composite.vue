<template>
  <scroll class="wrapper pd23">
    <div v-show="!load" class="text">
      <div v-if="!info">
          <song-list :tracks="songList" :isShow="false" @setPlayer="setPlayerSinger"></song-list>
          <play-list :playlist="playListList" title="歌单" :isShow="true" :count="playListList.length"></play-list>
      </div>
    </div>
    <page-loading v-show="load"></page-loading>
  </scroll>
</template>

<script>

import pageLoading from 'components/content/pageloading/PageLoading'
import SongList from 'components/content/songlist/SongList'
import PlayList from 'views/profile/childComponents/PlayList'
import Scroll from 'components/common/scroll/Scroll'

import { mapActions } from 'vuex'
import { Search } from 'network/search'

export default {
  components: { 
    SongList,
    PlayList,
    pageLoading,
    Scroll
  },
  data () {
    return {
      // 这个搜索结果都包含哪些部分
      orderList: [],
      // 查看同名歌曲
      songList: [],
      // 查看全部歌单
      playListList: [],
      info: false,
      load: true
    }
  },
  props: {
    // 搜索关键字
    keywords: {
      type: String
    }
  },
  watch: {
    keywords: function (val) {
      this.load = true
      if (val) {
        this._searchShow(val)
      }
    }
  },
  created () {
    this._searchShow(this.keywords)
  },
  methods: {
    ...mapActions([
      'setPlayer'
    ]),
    /**
     * 通过获取到的 动态的搜索关键字
     * 来获取数据，返回到页面
     */
    _searchShow (key) {
      Search(key)
        .then(res => { 
          if (res.code === 200) {
            let { 
              order,
              song,
              playList,
              video,
            } = res.result
            this.orderList = order ? order : []
            this.songList = song ? song.songs : []
            this.playListList = playList ? playList.playLists : []
            this.videoList = video ? video.videos : []
            this.load = false
            // 没有信息展示
            if (this.orderList.length === 0) {
              this.info = true
            }
          }
        })
        .catch(error => {
          this.load = false
          this.info = true
          console.log(error)
        })
    },
    setPlayerSinger(item, index) {
      this.setPlayer({
        list: this.songList,
        index
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.wrapper {
  position: fixed;
  top: 35px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .text {
    position: relative;
    top: 20px;
  }
}
</style>
