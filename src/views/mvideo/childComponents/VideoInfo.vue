<template>
  <div class="video-info-wra">
    <h1 class="video-title twoLinesEllipsis">{{title}}</h1>
    <div class="video-info-top">
      <span class="num">{{playTime | setNum}}次观看</span>
      <span
        class="tag-group"
        v-for="(item, index) in videoGroup"
        :key="index"
      >#{{item.name | setName}}#</span>
    </div>
    <div class="video-btn">
      <span class="icon-btn">
        <i class="iconfont icon-like-two"></i>
        <i class="num">{{praisedCount | setNum}}</i>
      </span>
      <span class="icon-btn">
        <i class="iconfont icon-collection-green"></i>
        <i class="num">{{subscribeCount | setNum}}</i>
      </span>
      <span class="icon-btn">
        <i class="iconfont icon-comment-one"></i>
        <i class="num">{{commentCount | setNum}}</i>
      </span>
      <span class="icon-btn">
        <i class="iconfont icon-share"></i>
        <i class="num">{{shareCount | setNum}}</i>
      </span>
    </div>
  </div>
</template>

<script>
import { filterSetPlayCount } from 'common/js/filters'
export default {
  name: '',
  props: {
    title: {
      type: String
    },
    playTime: {
      type: Number
    },
    praisedCount: {
      type: Number
    },
    commentCount: {
      type: Number
    },
    shareCount: {
      type: Number
    },
    subscribeCount: {
      type: Number
    },
    videoGroup: {
      type: Array
    }
  },
  filters: {
    setNum: function (val) {
      return filterSetPlayCount(val)
    },
    setName: function (val) {
      val = val.replace(/#/g, '')
      return val
    }
  }
}
</script>

<style lang='scss' scoped>
.video-info-wra {
  margin: 10px 0 10px 0;
  width: 100%;
  .video-title {
    font-size: 15px;
    line-height: 1.5;
    font-weight: 600;
    padding: 10px 0 0 0;
    box-sizing: border-box;
  }
  .video-info-top {
    height: 40px;
    line-height: 40px;
    .num {
      font-size: 12px;
      color: #999;
      margin-right: 5px;
    }
    .tag-group {
      box-sizing: border-box;
      padding: 5px 10px 5px 10px;
      font-size: 10px;
      border-radius: 10px;
      background-color: #eee;
      margin-right: 5px;
    }
  }
  .video-btn {
    display: flex;
    justify-content: space-between;
    color: #999;
    .icon-btn {
      display: flex;
      align-items: center;
      flex-direction: column;
      .iconfont {
        margin: 5px;
        font-size: 24px;
      }
      .num {
        font-size: 12.5px;
      }
    }
  }
}
</style>
