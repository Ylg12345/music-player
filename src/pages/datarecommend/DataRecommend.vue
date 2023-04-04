<template>
  <div class="date-recommend">
    <pages-nav title="每日推荐"></pages-nav>
    <scroll class="album-wrapper">
      <div class="container-top">
        <div class="pd23">
          <div class="date">
            <span class="day">{{day}}</span>
            <span class="month">{{month}}</span>
          </div>
          <div class="info">查收属于您的今日推荐</div>
        </div>
      </div>
      <song-list :tracks="tracks" :trackCount="trackCount" @setPlayer="setPlayerDate"></song-list>
    </scroll>
  </div>
</template>

<script>

import {mapActions} from 'vuex'
import {getRecommendSongs} from 'network/date-recommend'
import {ERR_OK} from 'network/config'
import PagesNav from 'components/common/pagesnav/PagesNav'
import SongList from 'components/content/songlist/SongList'
import Scroll from 'components/common/scroll/Scroll'

export default {
  components: {
    PagesNav,
    SongList,
    Scroll,
  },
  data() {
    return {
      tracks: [],
      trackCount: 0
    }
  },
  created() {
    this._getRecommendSongs()
  },
  computed: {
    day() {
      const day = new Date().getDate() < 10
        ? '0' + new Date().getDate()
        : new Date().getDate()
      return day
    },
    month() {
      const month = new Date().getMonth() + 1 < 10
        ? '0' + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1
      return month
    }
  },
  methods: {
    ...mapActions([
      'setPlayer'
    ]),
    _getRecommendSongs() {
      getRecommendSongs().then(res => {
        if(res.code === ERR_OK) {
          this.tracks = res.data.dailySongs
          this.trackCount = this.tracks.length
        }
      })
    },
    setPlayerDate(item, index) {
      this.setPlayer({
        list: this.tracks,
        index
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.date-recommend {
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
    .container-top {
      width: 100%;
      height: 180px;
      color: #fff;
      background-color: #dd001b;
      .pd23 {
        box-sizing: border-box;
        padding: 0 11.5px;
        .date {
          padding: 35px 0;
          .day {
            font-size: 35px;
          }
          .month {
            font-size: 20px;
            color: #c8d6e5;
            &::before {
              content: "/";
            }
          }
        }
      }
    }
  }
}
</style>