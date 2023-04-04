<template>
  <div class="rencently">
    <pages-nav title="最近播放" @back="backProfile"></pages-nav>
    <scroll class="wrapper">
      <song-list :tracks="songs" :trackCount="songsLength" @setPlayer="setPlayerSinger"></song-list>
    </scroll>
  </div>
</template>

<script>

import {getProfileRecord} from 'network/profile'
import {ERR_OK} from 'network/config'
import {mapActions} from 'vuex'
import PagesNav from 'components/common/pagesnav/PagesNav'
import SongList from 'components/content/songlist/SongList'
import Scroll from 'components/common/scroll/Scroll'

export default {
  components: {
    PagesNav,
    SongList,
    Scroll
  },
  data() {
    return {
      songs: [],
      songsLength: 0
    }
  },
  activated() {
    this._getProfileRecord()
  },
  methods: {
    ...mapActions([
      'setPlayer'
    ]),
    backProfile() {
      this.$router.push('/profile')
    },
    _getProfileRecord() {
      const type = 0
      let id = localStorage.getItem('accountUid')
      getProfileRecord(id, type).then(res => {
        if(res.code === ERR_OK) {
          this.songs = res.allData.map((item) => {
            return item.song
          })
          this.songsLength = res.allData.length
        }
      })
    },
    setPlayerSinger(item, index) {
      this.setPlayer({
        list: this.songs,
        index
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.rencently {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  .wrapper {
    position: fixed;
    width: 100%;
    top: 45px;
    bottom: 0;
    overflow: hidden;
  }
}
</style>