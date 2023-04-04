<template>
  <div class="play-list">
    <div class="top-title">
      <div class="left-title">
        <span class="title">{{title}}</span>
        <span class="count">({{count}})</span>
      </div>
      <div class="right-title">
        <i class="iconfont icon-add"></i>
        <i class="iconfont icon-dot-copy"></i>
      </div>
    </div>
    <div class="content-list">
      <div class="list-item" v-for="(item, index) in playlist" :key="index" @click="enter(item, index)">
        <div class="img-info smallImg"> 
          <img :src="Image(item)" alt />
        </div>
        <div class="info-content">
          <div class="play-name twoLines">
            <span v-html="item.name"></span>
          </div>
          <div class="play-tag">
            <p class="video-show">
              <span class="time">{{item.trackCount}}首</span>
              <span class="video-art" v-if="isShow">by{{Nickname(item)}}</span>
            </p>
          </div> 
        </div>
        <div class="right">
          <i class="iconfont icon-dot-copy"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapMutations} from 'vuex'

export default {
  props: {
    title: {
      type: String,
      default: '创建的歌单'
    },
    count: {
      type: Number,
      default: 0
    },
    playlist: {
      type: Array,
      default: []
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapMutations({
      setalbumitem: 'SET_ALBUM_ITEM'
    }),
    Nickname(item) {
      if(item.dj) {
        return item.dj.nickname
      }else {
        return item.creator.nickname
      }
    },
    Image(item) {
      if(item.dj) {
        return item.picUrl
      }else {
        return item.coverImgUrl
      }
    },
    enter(item, index) {
      this.setalbumitem(item)
      if(item.dj) {
        this.$router.push('/radiodetailpage')
      }else {
        this.$router.push('/albumpage')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.play-list {
  width: 100%;
  box-sizing: border-box;
  padding: 0 11.5px;
  .top-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: relative;
    .left-title {
      position: absolute;
      left: 0;
      .title {
        font-size: 16px;
        font-weight: 700;
        margin-right: 5px;
      }
      .count {
        font-size: 12px;
        color: #999;
      }
    }
    .right-title {
      position: absolute;
      right: 0;
      display: flex;
      align-items: center;
      .iconfont {
        font-size: 20px;
      }
      .icon-dot-copy {
        font-size: 24px;
        margin-left: 5px;
      }
    }  
  }
  .content-list {
    width: 100%;
    .list-item {
      width: 100%;
      height: 70px;
      position: relative;
      display: flex;
      align-items: center;
      overflow: hidden;
      .img-info {
        position: relative;
        box-sizing: border-box;
        height: 0;
        background-color: #ccc;
        border-radius: 10px;
        img {
          overflow: hidden;
          border-radius: 10px;
        }
        &.smallImg {
          width: 55px;
          padding-bottom: 55px;
          img {
            width: 100%;
          }
        }
      }
      .info-content {
        margin-left: 11.5px;
        .play-name {
          line-height: 20px;
          font-size: 15px;
          &.twoLines {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            overflow: hidden;
            -webkit-box-orient: vertical;
          }
        }
        .play-tag {
          max-width: 250px;
          height: 25px;
          line-height: 25px;
          font-size: 12px;
          color: #ccc;
          .video-show {
            .time {
              margin-right: 5px;
            }
          }
        }
      }
      .right {
        position: absolute;
        right: 0;
        .iconfont {
          font-size: 20px;
          color: #ccc;
        }
      }
    }
  }
}
</style>