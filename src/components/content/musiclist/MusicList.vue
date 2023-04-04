<template>
  <div class="music-list">
    <pages-nav title="全部歌曲"></pages-nav>
    <scroll 
      class="wrapper"
      :pullUpLoad=true 
      ref="scroll"
      @scrollToEnd="scrollToEnd" 
      :listenScroll=true 
      :scrollEnd=true
    >
      <song-list :tracks="totalSongs" :trackCount="total" :subscribedCount='total' :isIndex="false" @setPlayer="setPlayerSinger"></song-list>
    </scroll>
  </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import {getArtistSongList} from 'network/singer'
import {ERR_OK} from 'network/config'
import SongList from 'components/content/songlist/SongList'
import PagesNav from 'components/common/pagesnav/PagesNav'
import Scroll from 'components/common/scroll/Scroll'

export default {
  components: {
    SongList,
    PagesNav,
    Scroll
  },
  data() {
    return {
      offset: 1,
      songs: [],
      total: 0,
      totalSongs: []
    }
  },
  created() {
    if(!this.albumitem.id) {
      this.$router.push('/singer')
    }
  },
  computed: {
    ...mapGetters([
      'albumitem',
    ])
  },
  activated() {
    this.offset = 0
    this.totalSongs = []
    this._getArtistSongList()
  },
  methods: {
    ...mapActions([
      'setPlayer'
    ]),
    _getArtistSongList() {
      let id = this.albumitem.id
      let limit = 50
      let order = 'hot'
      getArtistSongList(id, order, limit, this.offset).then(res => {
        if(res.code === ERR_OK) {
          this.songs = res.songs
          this.total = res.total
          this.totalSongs = this.totalSongs.concat(this.songs)
        }
      })
    },
    setPlayerSinger(item, index) {
      this.setPlayer({
        list: this.totalSongs,
        index
      })
    },
    scrollToEnd() {
      this.pullingUp()
    },
    pullingUp() {
      this.offset++
      this._getArtistSongList()
      this.$refs.scroll.scroll.finishPullUp()
      this.$refs.scroll.refresh()
    },
  }
}
</script>

<style lang="scss" scoped>
.music-list {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 10;
  background: #fff;
  .wrapper {
    width: 100%;
    height: calc(100% - 44px);
    overflow: hidden;
  }
}
</style>