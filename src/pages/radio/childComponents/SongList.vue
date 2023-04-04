<template>
  <div class="list-item" @click="startSong">
    <div class="img-info" v-if="imgUrl">
      <img v-lazy="imgUrl + '?param=50y50'" :key="imgUrl" v-show="!nowSong" />
      <i class="iconfont icon-horn" v-show="nowSong"></i>
    </div>
    <div class="index" v-if="num">
      <span v-show="!nowSong">{{ num }}</span>
      <i class="iconfont icon-horn" v-show="nowSong"></i>
    </div>
    <div class="song-info">
      <p class="song-name" :class="{twoLine}">
        <!-- {{songName | setKeyWords}} -->
        <!-- 注意 如果使用 v-html 显示内容可能会把子节点内容覆盖 -->
        <span v-html="songName"></span>
        <span class="alia" v-show="alia">({{alia}})</span>
      </p>
      <p class="song-art" v-if="type==='songList'">
        <span>
          <span class="artist" v-for="(item, index) in artists" :key="index">{{ item.name }}</span>
        </span>
        <span class="album-name">{{ albumName }}</span>
      </p>
      <p class="dj-info" v-if="type==='djList'">
        <span class="data">{{createTime | setMonth}}</span>
        <span class="count">
          <i class="iconfont icon-pause"></i>
          {{listenerCount | setNum}}
        </span>
        <span class="time">
          <i class="iconfont icon-test"></i>
          {{duration | setTime}}
        </span>
      </p>
    </div>
    <div class="icon" @click.stop="showSlider(itemId)">
      <i class="iconfont icon-dot-copy"></i>
    </div>
  </div>
</template>

<script>
import { filterSetMonth, filterSetPlayCount, filterSetTime } from 'common/js/filters'

export default {
  name: '',
  props: {
    songName: {
      type: String
    },
    artists: {
      type: Array
    },
    albumName: {
      type: String
    },
    alia: {
      type: String
    },
    imgUrl: {
      type: String
    },
    num: {
      type: Number
    },
    type: {
      type: String,
      default: 'songList'
    },
    itemId: {
      type: Number
    },
    createTime: {
      type: Number
    },
    listenerCount: {
      type: Number
    },
    duration: {
      type: Number
    },
    nowSong: {
      type: Boolean,
      default: false
    },
    twoLine: {
      type: Boolean
    },
    keywords: {
      type: String
    }
  },
  filters: {
    setMonth: function (value) {
      return filterSetMonth(value)
    },
    setNum: function (value) {
      return filterSetPlayCount(value)
    },
    setTime: function (value) {
      return filterSetTime(value)
    }
  },
  methods: {
    startSong () {
      this.$emit('beginSong')
    },
    showSlider (id) {
      this.$emit('showSlider', id)
    }
  }
}
</script>

<style lang='scss' scoped>
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  font-size: 14px;
  .index {
    color: #999;
  }
  .icon-ring {
    color: #dd001b;
  }
  .img-info {
    width: 35px;
    height: 0;
    padding-bottom: 35px;
    margin-right: 10px;
    position: relative;
    img {
      border-radius: 10px;
      width: 35px;
      height: 35px;
    }
    .iconfont {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
  }
  .song-info {
    display: flex;
    flex-direction: column;
    .song-name {
      width: 75vw;
      max-height: 20px;
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .alia {
        color: #7c7b7d;
      }
      &.twoLine {
        max-height: 40px;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        -webkit-box-orient: vertical;
      }
    }
    .song-art {
      height: 20px;
      line-height: 20px;
      font-size: 11.5px;
      color: #dacdcd;
      width: 75vw;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .artist {
        &::after {
          content: "/";
        }
        &:last-child::after {
          content: "";
        }
      }
      .album-name {
        &::before {
          content: "-";
        }
      }
    }
    .dj-info {
      font-size: 10px;
      line-height: 1.5;
      color: #ccc;
      .iconfont {
        font-size: 10px;
      }
      .data,
      .count {
        margin-right: 10px;
      }
    }
  }
  .icon {
    color: #ccc;
    .icon-dot-copy {
      font-size: 22px;
    }
  }
}
</style>
