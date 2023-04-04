<template>
  <div class="find" ref="find">
    <scroll class="wrapper" ref="wrapper">
      <find-slider :banners="banners" @imageload='imageload'></find-slider>
      <find-home-page></find-home-page>
      <find-song-list v-if="playlists.length" :playlists="playlists"></find-song-list>
      <!-- <disc-list :playlists="albums" :isShow=false toptitle="新碟" toptomany="更多新碟" key="1" v-if="albums.length"></disc-list> -->
      <disc-list :playlists="findsonglist" :isShow=false toptitle="新歌" toptomany="新歌推荐" key="2" v-if="findsonglist.length"></disc-list>
    </scroll>
  </div>
</template>

<script>

import {mapGetters, mapMutations} from 'vuex'
import {getFindSlider, getDiscList, getNewSongs, getNewAlbums} from 'network/find'
import {ERR_OK} from 'network/config'
import {playlistMixin} from 'common/js/mixin'

import Scroll from 'components/common/scroll/Scroll'
import FindSlider from './childComponents/FindSlider'
import FindHomePage from './childComponents/FindHomePage'
import FindSongList from './childComponents/FindSongList'
import DiscList from 'components/content/disclist/DiscList'


export default {
  components: {
    Scroll,
    FindSlider,
    FindHomePage,
    FindSongList,
    DiscList,
  },
  data() {
    return {
      banners: [],
      playlists: [],
      albums: [],
      findsonglist: [],
      isImg: false
    }
  },
  mixins: [playlistMixin],
  created() {
    this._getFindSlider()
    this._getDiscList()
    this._getNewAlbums()
    this._getNewSongs()
  },
  beforeRouteLeave (to, from, next) {
    this.setprevpath(this.$route.path)
    next()
  },
  activated() {
    this.$refs.wrapper.refresh()
  },
  methods: {
    ...mapMutations({
      setprevpath: 'SET_PREV_PATH'
    }),
    _getFindSlider() {
      const type = 1
      getFindSlider(type).then(res => {
        if(res.code === ERR_OK){
          this.banners = res.banners
        }
      })
    },
    _getDiscList() {
      const limit = 12
      getDiscList(limit).then(res => {
        if(res.code === ERR_OK) {
          this.playlists = res.result
        }
      })
    },
    _getNewAlbums() {
      const limit = 3
      getNewAlbums(limit).then(res => {
        if(res.code === ERR_OK) {
          this.albums = res.monthData
        }
      })
    },
    _getNewSongs() {
      const type = 0
      getNewSongs(type).then(res => {
        if(res.code === ERR_OK) {
          this.findsonglist = res.data.slice(0, 6)
        }
      })
    },
    imageload() {
      if(!this.isImg) {
        this.$refs.wrapper.refresh()
        this.isImg = true
      }
    },
    handlePlaylist(playlist) {
/*    const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.singerlistview.refresh() */
      if(playlist.length > 0) {
        this.$refs.find.style.bottom = '60px'
        this.$refs.wrapper.refresh()
      }else {
        this.$refs.find.style.bottom = ''
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.find {
/*   width: 100%;
  height: calc(100vh - 44px); */
  position: fixed;
  width: 100%;
  top: 44px;
  bottom: 0;
  .wrapper {
    height: 100%;
    overflow: hidden;
  }
}
</style>