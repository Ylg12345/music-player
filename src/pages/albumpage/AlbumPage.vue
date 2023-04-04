<template>
  <div class="albumpage" ref="albumpage">
    <pages-nav :title="rankplaylist" @back="backprofile"></pages-nav>
    <scroll class="album-wrapper" ref="wrapper" :data="trackIds">
      <div class="album-creator-bg"></div>
      <div class="album-creator">
        <div class="album-info">
          <div class="item">
            <i>
              <img src="~common/img/播放3.svg">
              <span>{{playCount(albumcreator.playCount)}}</span>
            </i>
            <img v-lazy="albumcreator.coverImgUrl">
          </div>
          <div class="ar">
            <p class="ar-p">{{albumcreator.name}}</p>
            <div class="ar-item">
              <div class="ar-item-img">
                <img :src="albumcreatoritem.avatarUrl">
              </div>
              <span class="ar-item-span">{{albumcreatoritem.nickname}}</span>
            </div>
            <div class="ar-item-p"><p>{{albumcreator.description}}</p></div>
          </div>
        </div>
        <div class="album-icons">
          <div @click="entercomments">
            <i><img src="~common/img/评论.svg"></i>
            <span>{{playCount(albumcreator.commentCount)}}</span>
          </div>
          <div>
            <i><img src="~common/img/分享.svg"></i>
            <span>{{playCount(albumcreator.shareCount)}}</span>
          </div>
          <div>
            <i><img src="~common/img/下载.svg"></i>
            <span>下载</span>
          </div>
          <div>
            <i><img src="~common/img/多选框.svg"></i>
            <span>多选</span>
          </div>
        </div>
      </div>
      <song-list :tracks="trackIds" :trackCount="trackCount" :subscribedCount="subscribedCount" @setPlayer="setplayer"></song-list>
    </scroll>
  </div>
</template>

<script>

import {mapGetters, mapMutations, mapActions} from 'vuex'
import {getRankListDetail} from 'network/find'
import {getSongDetail} from 'network/albumpage'
import {ERR_OK} from 'network/config'
import {playlistMixin} from 'common/js/mixin'

import Scroll from 'components/common/scroll/Scroll'
import PagesNav from 'components/common/pagesnav/PagesNav'
import SongList from 'components/content/songlist/SongList'

const MAX = 500

export default {
  components: {
    PagesNav,
    SongList,
    Scroll,
  },
  data() {
    return {
      rankplaylist: '',
      albumcreator: [],
      albumtracks: [],
      albumcreatoritem: '',
      trackCount: 0,
      subscribedCount: 0,
      trackIds: [],
      tracks: []
    }
  },
  mixins: [playlistMixin],
  computed: {
    ...mapGetters([
      'prevpath',
      'albumitem',
      'playlist',
      'topcomments'
    ]),
  },
  created () {
    if(this.albumitem.id) {
      return
    }
    this.$router.push('/find')
  /*     
  //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {          
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    } 

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify
      ({
          prevpath: this.$store.state.prevpath, 
          albumitem: this.$store.state.albumitem
      }))
    }) 
  */  
  },
  activated() {
    this.$refs.wrapper.scrollTo(0, 0, 0)
    if(this.prevpath === '/rank') {
      this.rankplaylist = '云音乐榜单'
    }
    if(this.prevpath === '/find') {
      this.rankplaylist = '榜单'
    }
    this._getRankListDetail(this.albumitem.id)
  },
  methods: { 
    ...mapMutations({
      settopcomments: 'SET_TOP_COMMENTS',
      setisRefresh: 'SET_IS_REFRESH'
    }),
    ...mapActions([
      'setPlayer'
    ]),
    backprofile() {
      if(this.albumitem.userId && this.albumitem.creator) {
        this.setisRefresh(true)
        this.$router.push('/profile')
      }else {
        this.$router.push('/find')
      }
    },
    entercomments() {
      this.$router.push({
        path: `/comments/${this.albumcreator.id}`,
      })
      let topcomments = {
        id: this.albumcreator.id,
        coverImgUrl: this.albumcreator.coverImgUrl,
        name: this.albumcreator.name,
        commentCount: this.albumcreator.commentCount,
        nickname: this.albumcreatoritem.nickname
      }
      this.settopcomments(topcomments)
    },
    handlePlaylist(playlist) {
/*
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.singerlistview.refresh()
 */
      if(playlist.length > 0) {
        this.$refs.albumpage.style.bottom = '60px'
        this.$refs.wrapper.refresh()
      }else {
        this.$refs.albumpage.style.bottom = ''
      }
    },
    playCount(playcount) {
      if(playcount > 100000 && playcount < 100000000) {
        return `${Math.floor(playcount / 10000)}万`
      }else if(playcount >= 100000000) {
        return `${Math.floor(playcount / 100000000)}亿`
      }else {
        return playcount
      }
    },
    setplayer(item, index) {
      this.setPlayer({
        list: this.trackIds,
        index
      })
    },
    _getRankListDetail(id) {
      this.trackIds = []
      getRankListDetail(id).then(res => {
        if(res.code === ERR_OK) {
          this.albumcreator = res.playlist
          this.albumtracks = res.playlist.tracks
          this.albumcreatoritem = this.albumcreator.creator
          this.trackCount = this.albumcreator.trackCount
          this.subscribedCount = this.albumcreator.subscribedCount

          //用trackIds请求歌单所有歌曲信息
          const albumtrackIds = res.playlist.trackIds
          albumtrackIds.forEach((item) => {
            getSongDetail(item.id).then(res => {
              if(res.code === ERR_OK) {
                this.trackIds.push(res.songs[0])
              }
            })
          })
        }
      })
    },
  },
  watch: {
    albumitem() {
      if(this.albumitem) {
        return
      }
      this.$router.push('/find')
    },
  }
}
</script>

<style lang="scss" scoped>
.albumpage {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 10;
  background: #fff;
  .album-wrapper {
    width: 100%;
    height: calc(100% - 44px);
    overflow: hidden;
    .album-creator-bg {
      position: absolute;
      width: 100%;
      height: 280px;
      top: 0;
      left: 0;
      z-index: -1;
/*       opacity: 0.8;
      filter: blur(20px); */
      background-color:#dd001b;
    }
    .album-creator {
      position: relative;
      padding-top: 20px;
      width: 100%;
      height: 240px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      box-sizing: border-box;
      .album-info {
        width: 100%;
        height: 60%;
        position: relative;
        .item {
          position: relative;
          width: 125px;
          height: 130px;
          padding-bottom: 5px;
          z-index: 5;
          left: 20px;
          i {
            position: absolute;
            top: 5.5px;
            right: 5px;
            font-size: 10px;
            width: 55px;
            color: #fff;
            height: 20px;
            img {
              width: 16px;
              height: 16px;
            }
            span {
              position: absolute;
              top: 3px;
            }
          }
          img {
            width: 125px;
            height: 125px;
            border-radius: 6.5px;
          }
          .item-img {
            border-radius: 8px;
          }
        }

        .ar {
          position: absolute;
          right: 20px;
          top: 0;
          width: 180px;
          height: 180px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          .ar-p {
            font-size: 13px;
            line-height: 1.5;
            text-overflow: ellipsis;
            overflow: hidden;
            color: #fff;
            height: 40px;
          }
          .ar-item {
            height: 40px;
            color: #fff;
            display: flex;
            align-items: center;
            font-size: 13px;
            .ar-item-img {
              width: 30px;
              height: 0px;
              padding-bottom: 30px;
              margin-right: 8px; 
              img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
              }
            }
            .ar-item-span {
              display: inline-block;
              width: 110px;
              white-space: nowrap;
              text-overflow: ellipsis
            }
          }
          .ar-item-p {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            color: #fff;
            font-size: 13px;
            line-height: 16px;
          }
        }
      } 
      .album-icons {
        position: absolute;
        margin-top: 8px;
        display: flex;
        justify-content: space-around;
        width: 100%;
        bottom: 30px;
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          i {
            margin-bottom: 5px;
            img {
              width: 20px;
              height: 20px;
            }
          }
          span {
            color: #fff;
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>