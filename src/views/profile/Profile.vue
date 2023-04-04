<template>
  <div class="profile">
    <profile-icons></profile-icons>
    <scroll class="wrapper" ref="scroll">
      <div class="create-list" v-if="createdPlaylist.length">
        <play-list :count="createdPlaylistCount" :playlist="createdPlaylist"></play-list>
      </div>
      <div class="sub-list" v-if="subPlaylist.length">
        <play-list :count="subPlaylistCount" :playlist="subPlaylist" title="收藏的歌单" :isShow="true"></play-list>
      </div>
    </scroll>
  </div>
</template>

<script>

import {getProfileSubCount, getProfilePlayList} from 'network/profile'
import {ERR_OK} from 'network/config'
import {mapGetters, mapMutations} from 'vuex'
import ProfileIcons from './childComponents/ProfileIcons'
import PlayList from './childComponents/PlayList'
import Scroll from 'components/common/scroll/Scroll'

export default {
  components: {
    ProfileIcons,
    PlayList,
    Scroll
  },
  data() {
    return {
      createdPlaylistCount: 0,
      subPlaylistCount: 0,
      createdPlaylist: [],
      subPlaylist: []
    }
  },
  activated() {
    this._getProfileSubCount()
    this._getProfilePlayList()
  },
  computed: {
    ...mapGetters([
      'isRefresh'
    ])
  },
  methods: {
    ...mapMutations({
      setisRefresh: 'SET_IS_REFRESH'
    }),
    _getProfileSubCount() {
      getProfileSubCount().then(res => {
        if(res.code === ERR_OK) {
          this.createdPlaylistCount = res.createdPlaylistCount
          this.subPlaylistCount = res.subPlaylistCount
        }
      })
    },
    _getProfilePlayList() {
      let accountUid = localStorage.getItem('accountUid')
      getProfilePlayList(accountUid).then(res => {
        if(res.code === ERR_OK){
          this.createdPlaylist = res.playlist.slice(0, this.createdPlaylistCount)
          this.subPlaylist = res.playlist.slice(this.createdPlaylistCount, res.playlist.length)
        }
      })
    }
  },
  watch: {
    isRefresh() {
      if(this.isRefresh === true) {
        this.$refs.scroll.refresh()
        this.setisRefresh(false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  width: 100%;
  .wrapper {
    position: fixed;
    top: 140px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
}
</style>