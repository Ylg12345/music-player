<template>
  <div class="rank" ref="rank">
    <pages-nav title="排行榜"></pages-nav>
    <scroll class="wrapper" ref="wrapper">
      <div class="rank-content">
        <div class="rank-gov">
          <div class="title">官方榜</div>
          <div class="rank-gov-item" v-for="(Item, index) in rankTopList" @click="selectItem(Item)">
            <div class="item-left">
            <img :src="Item.coverImgUrl">
              <span>{{updateFre[index]}}</span>
            </div>
            <div class="item-right">
              <div class="item-right-item" v-for="(item, index) in Item.tracks.slice(0, 3)">
                <span class="right-one">{{index + 1}}.</span>
                <span class="right-two">{{item.name}}</span>
                <span>-</span>
                <span class="right-three">{{mergename(item)}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rank-recommend">
        <disc-list :playlists='rankRecommend' toptitle='推荐榜' :isShow=false key="a"></disc-list>
      </div>
      <div class="rank-more">
        <disc-list :playlists='rankMore' toptitle='更多榜单' :isShow=false key="b"></disc-list>
      </div>
    </scroll>
  </div>
</template>

<script>

import {mapMutations} from 'vuex'
import {getRankList, getRankListDetail} from 'network/find'
import {ERR_OK} from 'network/config'
import {playlistMixin} from 'common/js/mixin'

import Scroll from 'components/common/scroll/Scroll'
import PagesNav from 'components/common/pagesnav/PagesNav'
import DiscList from 'components/content/disclist/DiscList'

export default {
  components: {
    PagesNav,
    DiscList,
    Scroll,
  },
  data() {
    return {
      rankTopList: [],
      rankRecommend: [],
      rankMore: [],
      topIds: [],
      updateFre: [],
    }
  },
  mixins: [playlistMixin],
  created() {
    this._getRankList()
    this._getRankListDetail()
  },
  computed: {

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
      setprevpath: 'SET_PREV_PATH',
      setalbumitem: 'SET_ALBUM_ITEM'
    }),
    handlePlaylist(playlist) {
      if(playlist.length > 0) {
        this.$refs.rank.style.bottom = '60px'
        this.$refs.wrapper.refresh()
      }else {
        this.$refs.rank.style.bottom = ''
      }
    },
    mergename(item) {
      if(item.ar.length > 1) {
        let ar = []
        let singername = ''
        item.ar.forEach((item) => {
          ar.push(item.name)
        })
        for(var i = 0; i < ar.length; i++) {
          singername = singername +`${ar[i]}/`
        }
        return singername
      }else {
        return item.ar[0].name
      }
    },
    selectItem(item) {
      this.setalbumitem(item)
      this.$router.push('/albumpage')
    },
    _getRankList() {
      getRankList().then(res => {
        if(res.code === ERR_OK) {
          this.rankRecommend = res.list.slice(4, 10)
          this.rankMore = res.list.slice(10, 35)
          this.updateFre = res.list.slice(0, 4).map(item => {
            return item.updateFrequency
          })
          this.topIds = res.list.slice(0, 4).map((item) => {
            return item.id
          })
        }
        this.topIds.forEach(id => {
          this._getRankListDetail(id)
        })
      })
    },
    _getRankListDetail(id)  {
      if(!id) {
        return
      }
      getRankListDetail(id).then(res => {
        if(res.code === ERR_OK) {
          this.rankTopList.push(res.playlist)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.rank {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 5;
  background: #fff;
  .wrapper {
    width: 100%;
    height: calc(100% - 44px);
    overflow: hidden;
    .rank-content {
      height: 100%;
      box-sizing: border-box;
      padding: 0 11.5px;
      color: #333;
      font-size: 14px;
      line-height: 1;
      .rank-gov {
        .title {
          font-weight: 700;
          height: 50px;
          line-height: 50px;
        }
        .rank-gov-item {
          width: 100%;
          padding-bottom: 15px;
          display: flex;
          align-items: center;
          .item-left {
            position: relative;
            width: 85px;
            height: 0;
            padding-bottom: 85px;
            border-radius: 6.5px;
            overflow: hidden;
            img {
              width: 90px;
              height: 90px;
              vertical-align: middle;
            }
            span {
              position: absolute;
              bottom: 3px;
              left: 3px;
              font-size: 12px;
              color: #fff;
            }
          }
          .item-right {
            margin-left: 10px;
            .item-right-item {
              height: 25px;
              line-height: 25px;
              width: 225px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              span {
                margin-right: 7px;
              }
            }
          }
        }
      }
    }
  }

}
</style>