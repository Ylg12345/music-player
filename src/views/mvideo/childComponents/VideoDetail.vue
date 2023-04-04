<template>
  <div class="video-detail">
    <div class="top-fix">
      <general-nav @returnPage="returnPage" ref="nav" class="fixed">
        <span class="text">{{title}}</span>
      </general-nav>
      <video-top  :videoId="videoId" :allTime="allTime" @blockNav="blockNav" @hideNav="hideNav"></video-top>
    </div>
    <scroll 
    class="container"
    :pullUpLoad=true 
    ref="scroll"
    @scrollToEnd="scrollToEnd" 
    :listenScroll=true 
    :scrollEnd=true>
      <video-info
        class="videoinfo"
        :title="title"
        :playTime="playTime"
        :praisedCount="praisedCount"
        :commentCount="commentCount"
        :shareCount="shareCount"
        :subscribeCount="subscribeCount"
        :videoGroup="videoGroup.slice(0,1)"
      ></video-info>
      <div class="video-creator">
        <div class="left">
          <div class="img-info">
            <img :src="avatarUrl + '?param=50y50'" alt />
          </div>
          <span class="author">{{nickname}}</span>
        </div>
        <div class="concern tag-group">+ 关注</div>
      </div>
      <div class="split"></div>
      <h1 class="title">相关视频</h1>
      <div class="list-item" v-for="(item, index) in relateList" :key="index" @click="enterVideoDetail(item)">
        <div class="img-info bigImg"> 
          <span class="count">
            <i class="iconfont icon-pause"></i>
            {{item.playTime | numRule}}
          </span>
          <img :src="item.coverUrl + '?param=200y120'" alt />
        </div>
        <div class="info-content">
          <div class="play-name twoLines">
            <span v-html="item.title"></span>
          </div>
          <div class="play-tag">
            <p class="video-show">
              <span class="time">{{item.durationms | setTime}}</span>
                by
              <span class="video-art" v-for="ite in item.creator">{{ite.userName}}</span>
            </p>
          </div> 
        </div>
      </div>
      <comment-list :comments="hotComments" key="hot"></comment-list>
      <comment-list :comments="totalComments" title="最新评论" key="comments"></comment-list>
    </scroll>
  </div>
</template>

<script>

import { filterSetPlayCount, filterSetTime} from 'common/js/filters'
import {getVideoDetail, getRelatedAllVideo, getCommentVideo, getCommentMV} from 'network/video'
import {ERR_OK} from 'network/config'
import VideoTop from './Video'
import VideoInfo from './VideoInfo'
import generalNav from 'components/content/generalnav/generalNav'
import Scroll from 'components/common/scroll/Scroll'
import CommentList from 'components/content/commentlist/CommentList'

export default {
  components: {
    VideoTop,
    generalNav,
    VideoInfo,
    Scroll,
    CommentList
  },
  data() {
    return {
      videoId: '',
      allTime: 0,
      title: '',
      videoGroup: [],
      playTime: 0,
      praisedCount: 0,
      commentCount: 0,
      shareCount: 0,
      subscribeCount: 0,
      avatarUrl: '',
      nickname: '',
      relateList: [],
      totalComments: [],
      hotComments: [],
      offset: 0,
      limit: 20
    }
  },
  activated() {
    this.offset = 0
    this.totalComments = []
    this.hotComments = []
    this.videoId = this.$route.query.id
    this._getAllData(this.videoId)
  },
  filters: {
    numRule: function (value) {
      return filterSetPlayCount(value)
    },
    setTime: function (value) {
      return filterSetTime(value)
    },
  },
  methods: {
    returnPage() {
      this.$router.go(-1)
    },
    enterVideoDetail(item) {
      this._getAllData(item.vid)
      this.videoId = item.vid
    },
    _getAllData(id) {
      this._getVideoDetail(id)
      this._getRelatedAllVideo(id)
      this._getCommentVideo(id)
    },
    _getVideoDetail(id) {
      getVideoDetail(id).then(res => {
        if(res.code === ERR_OK) {
          const { durationms, title, videoGroup, playTime, praisedCount, commentCount, shareCount, subscribeCount } = res.data
          const { avatarUrl, nickname } = res.data.creator
          this.allTime = durationms
          this.title = title
          this.playTime = playTime
          this.praisedCount = praisedCount
          this.commentCount = commentCount
          this.shareCount = shareCount
          this.subscribeCount = subscribeCount
          this.avatarUrl = avatarUrl
          this.nickname = nickname
          this.videoGroup = videoGroup
        }
      })
    },
    _getRelatedAllVideo(id) {
      getRelatedAllVideo(id).then(res => {
        if(res.code === ERR_OK) {
          this.relateList = res.data
          console.log(this.relateList)
        }
      })
    },
    _getCommentVideo(id) {
      getCommentVideo(id, this.limit, this.offset).then(res => {
        if(res.code === ERR_OK) {
          this.totalComments = this.totalComments.concat(res.comments)
          if(res.hotComments.length) {
            this.hotComments = res.hotComments
          }else {
            return
          }
        }
      })
    },
    scrollToEnd() {
      this.pullingUp()
    },
    pullingUp() {
      this.offset++
      this._getCommentVideo(this.videoId)
      this.$refs.scroll.scroll.finishPullUp()
      this.$refs.scroll.refresh()
    },
    blockNav() {
      this.$refs.nav.visible()
    },
    hideNav() {
      this.$refs.nav.hidden()
    }
  }
}
</script>

<style lang="scss" scoped>
.video-detail {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  .top-fix {
    width: 100%;
    height: 220px;
    position: relative;
    .fixed {
      position: fixed;
      width: 100%;
      height: 44px;
      z-index: 9;
      top: 0;
      .text {
        color: #fff;
        font-size: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .container {
    position: fixed;
    top: 220px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .videoinfo {
      box-sizing: border-box;
      padding: 0 11.5px;
    }
    .video-creator {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 11.5px;
      .left {
        display: flex;
        align-items: center;
        .img-info {
          width: 25px;
          height: 0;
          padding-bottom: 25px;
          margin-right: 10px;
          img {
            width: 100%;
            border-radius: 50%;
          }
        }
        .author {
          font-size: 13.5px;
        }
      }
      .concern {
        background-color: #dd001b;
        color: #fff;
      }
      .tag-group {
        width: 60px;
        box-sizing: border-box;
        padding: 5px 10px 5px 10px;
        font-size: 10px;
        border-radius: 10px;
        margin-right: 5px;
        text-align: center;
      }
    }
    .split {
      width: 100%;
      height: 6.5px;
      background-color: #eee;
      margin: 10px 0;
    }
    .title {
      box-sizing: border-box;
      padding: 0 11.5px;
      font-weight: 700;
      margin: 15px 0;
      font-size: 14px;
    }
    .list-item {
      margin-top: 13px;
      width: 100%;
      height: 80px;
      position: relative;
      display: flex;
      align-items: center;
      overflow: hidden;
      padding: 0 11.5px;
      box-sizing: border-box;
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
        &.bigImg {
          width: 140px;
          padding-bottom: 70px;
          img {
            width: 140px;
            height: 70px;
          }
        }
        .count {
          position: absolute;
          color: #fff;
          right: 5px;
          top: 5px;
          font-size: 6.5px;
          .icon-pause {
            font-size: 6.5px;
          }
        }
      }
      .info-content {
        margin-left: 11.5px;
        .play-name {
          line-height: 20px;
          font-size: 14px;
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
          font-size: 10px;
          color: #666;
          .time {
            margin-left: 6.5px;
          }
        }
      }
    }
  }
}
</style>