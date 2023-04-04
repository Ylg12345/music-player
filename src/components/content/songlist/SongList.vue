<template>
  <div class="song-list">
    <div class="song-list-top" v-if="isShow">
      <i>
        <img src="~common/img/播放4.svg">
      </i>
      <span class="span-one">播放全部</span>
      <span class="span-two">(共{{trackCount}}首)</span>
      <div class="sub-count" v-if="subscribedCount && isIndex">
        +收藏({{subscribedCount}})
      </div>
    </div>
    <div class="song-list-content">
      <div class="song-list-item" v-for="(item, index) in tracks" @click="setPlayer(item,index)">
        <div class="left">
          <span v-if="subscribedCount">{{index + 1}}</span>
          <div class="img-info" v-if="!subscribedCount">
            <img :src="item.al.picUrl">
          </div>
        </div>
        <div class="item-center">
          <p class="item-name">{{item.name}}</p>
          <p class="item-bottom">{{item.ar[0].name}}  -  {{item.al.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapMutations, mapGetters} from 'vuex'

export default {
  props: {
    tracks: {
      type: Array,
      default: []
    },
    trackCount: {
      type: Number,
      default: 0
    },
    subscribedCount: {
      type: Number,
      default: 0
    },
    isShow: {
      type: Boolean,
      default: true
    },
    isIndex: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    setPlayer(item, index) {
      this.$emit('setPlayer', item, index)
    }
  },
}
</script>

<style lang="scss" scoped>
.song-list {
  width: 100%;
  .song-list-top {
    position: relative;
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 0 6.5px;
    i {
      position: relative;
      width: 16px;
      height: 16px;
      margin: 0 5px 0 5px;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
    .span-one {
      margin-right: 8px;
      font-size: 16px;
    }
    .span-two {
      font-size: 14px;
      color: #999;
      font-size: small;
    }
    .sub-count {
      position: absolute;
      box-sizing: border-box;
      padding: 0 11.5px;
      font-size: smaller;
      margin-top: 3px;
      height: 35px;
      line-height: 35px;
      border-radius: 20px;
      background-color: #dd001b;
      color: #fff;
      right: 30px;
      top: 2px;
    }
  }
  .song-list-content {
    width: 100%;
    box-sizing: border-box;
    padding: 5px 18px;
    background-color: #fff;
    transform: translate3d(0, -25px, 0);
    margin-top: 25px;
    .song-list-item {
      display: flex; 
      align-items: center;
      height: 60px;
      .left {
        position: relative;
        color: #999;
        width: 45px;
        height: 35px;
        span {
          vertical-align: -5px;
          position: absolute;
          left: 10px;
        }
        .img-info {
          width: 35px;
          height: 0;
          padding-bottom: 35px;
          margin-right: 10px;
          position: relative;
          img {
            border-radius: 5px;
            width: 35px;
            height: 35px;
            vertical-align: middle;
          }
        }
      }
      .item-center {
        .item-name {
          width: 75vw;
          max-height: 20px;
          line-height: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 14px;
        }
        .item-bottom {
          height: 20px;
          line-height: 20px;
          font-size: 11.5px;
          color: #dacdcd;
          width: 75vw;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>