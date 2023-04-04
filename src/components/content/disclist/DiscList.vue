<template>
  <div class="disclist" style="overflow-x: hidden">
    <div v-if="isShowTop">
      <h1>{{toptitle}}</h1>
      <div class="top-right">{{toptomany}}</div>
    </div>
    <div class="disc-song-list">
      <div class="item" v-for="item in playlists" @click="selectItem(item)">
        <i v-if="isShow">
          <img src="~common/img/播放3.svg">
          <span>{{playCount(item.playCount)}}</span>
        </i>
        <img v-lazy="selectImg(item)">
        <span>{{selectName(item)}}</span>
      </div>
    </div>
  </div>
</template>


<script>

import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  props: {
    playlists: {
      type: Array,
      default: []
    },
    toptitle: {
      type: String,
      default: ''
    },
    toptomany: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: true
    },
    isShowTop: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
    }
  },
  created() {
    //console.log(this.playlists[0].album)
  },
  methods: {
    ...mapMutations({
      setalbumitem: 'SET_ALBUM_ITEM'
    }),
    ...mapActions([
      'setPlayer'
    ]),
    playCount(playcount) {
      if(playcount > 100000 && playcount < 100000000) {
        return `${Math.floor(playcount / 10000)}万`
      }else if(playcount >= 100000000) {
        return `${Math.floor(playcount / 100000000)}亿`
      }else {
        return playcount
      }
    },
    selectImg(item) {
      //return item.adType === 0 ? item.coverImgUrl : item.status === 0 ? item.album.picUrl : item.picUrl
      if(this.toptitle === '推荐歌单' || item.adType === 0) {
        if(item.type === 0) {
          return item.picUrl
        }else {
          return item.coverImgUrl
        }
        
      }else if(this.toptitle === '新碟') {
        return item.picUrl
      }else if(this.toptitle === '精品推荐' || this.toptitle === '电台推荐') {
        return item.picUrl
      }else {
        return item.album.picUrl
      }
    },
    selectItem(item) {
      if(this.toptitle === '新歌') {
        let list = []
        list.push(item)
        this.setPlayer({
          list,
          index: 0
        })
      }else if(this.toptitle === '新碟'){
        return
      }else if(this.toptitle === '精品推荐' || this.toptitle === '电台推荐') {
        this.setalbumitem(item)
        this.$router.push('/radiodetailpage')
      }else {
        this.setalbumitem(item)
        this.$router.push('/albumpage')
      }
    },
    selectName(item) {
      if(this.toptitle === '精品推荐' || this.toptitle === '电台推荐') {
        return item.rcmdText
      }else {
        return item.name
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.disclist {
  width: 100%;
  box-sizing: border-box;
  padding: 0 11.5px;
  position: relative;
  h1 {
    padding: 15px 0 15px 5px;
    font-size: 15px;
    font-weight: 700;
    box-sizing: border-box;
  }
  .top-right {
    position: absolute;
    right: 10px;
    top: 10px;
    box-sizing: border-box;
    width: 70px;
    height: 24px;
    padding: 5px 5px 5px 6.5px;
    font-size: 10px;
    border-radius: 5px;
    letter-spacing: 0.5px;
    text-align: center;
  }
  .disc-song-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      position: relative;
      width: 110px;
      height: 161px;
      padding-bottom: 5px;
      i {
        position: absolute;
        z-index: 1;
        top: 5.5px;
        right: 5.5px;
        font-size: 10px;
        color: #fff;
        width: 60px;
        height: 20px;
        img {
          width: 16px;
          height: 16px;
        }
        span {
          display: inline-block;
          width: 60px;
          position: absolute;
          top: -7px;
        }
      }
      img {
        width: 110px;
        height: 110px;
        border-radius: 6.5px;
      }
      .item-img {
        border-radius: 8px;
      }
      span {
        margin-top: 10px;
        font-size: 11.5px;
        line-height: 15px;
        letter-spacing: .5px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>