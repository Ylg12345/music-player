<template>
  <div class="video" v-if="videoList.length">
    <div class="video-item" v-for="(item, index) in videoList" v-if="item !== undefined">
      <div class="video-info">
        <img :src="item.data.coverUrl + '?param=360y170'">
        <circle-loading type="absolute" width="335" height="190" class="none" ref="load"></circle-loading>
        <div class="play-video" ref="playVideo" @touchstart="hideFnBtn(index)">
          <video
          class="video_tag"
          @canplay="startPlay(index)"
          ref="video"
          src="localhost"
          @timeupdate="setBarTime(index)"
          ></video>
          <div class="fn-btn" ref="fnBtn" @click.stop>
            <span class="center-bofang" ref="button" @click="togglePlaying(index, item)">
              <i
              class="iconfont"
              :class="{iconPause: pause === `pause${index}`, iconPlay: play === `play${index}`}"
              ></i>
            </span>
            <progress-bar
            class="bar"
            :index="index"
            :allTime="item.data.durationms"
            :time="playTime"
            :width="progressWidth"
            @time="changeTime"
            >
            </progress-bar>
          </div>
        </div>
        <span class="tag">{{ item.data.videoGroup ? item.data.videoGroup[0].name : ''}}</span>
        <span class="center-bofang" ref="button" @click="togglePlaying(index, item)">
          <i
            class="iconfont icon-pause"
          ></i>
        </span>
        <span class="go-count">
          <i class="iconfont icon-pause"></i>
          {{Playcount(item) | setCount}}
        </span>
        <span class="go-time">
          <i class="iconfont icon-test"></i>
          {{Duration(item) | setTime}}
        </span>
      </div>
      <h1 class="title">{{Title(item)}}</h1>
      <div class="bottom" @click="enterVideo(item)">
        <div class="creator">
          <div class="img-info">
            <img :src="artistImg(item)" alt />
          </div>
          <span class="name">{{artistName(item)}}</span>
        </div>
        <div class="button">
          <span class="praised">
            <i class="iconfont icon-like-two"></i>
            <i class="num">{{likeCount(item) | setCount}}</i>
          </span>
          <span class="comment">
            <i class="iconfont icon-comment-one"></i>
            <i class="num">{{item.data.commentCount | setCount}}</i>
          </span>
          <span class="share">
            <i class="iconfont icon-dot-copy"></i>
          </span>
        </div>
      </div>
      <div class="split"></div>
    </div>
  </div>
</template>

<script>

import { filterSetPlayCount, filterSetTime } from 'common/js/filters'
import {getVideoUrl, getMVUrl} from 'network/video'
import {ERR_OK} from 'network/config'
import {mapMutations, mapGetters} from 'vuex'
import ProgressBar from './ProgressBar'
import CircleLoading from 'components/content/circleloading/CircleLoading'

// 定义一个上一个播放的视频索引，初始值为undefined
let lastIndex

export default {
  components: {
    ProgressBar,
    CircleLoading
  },
  props: {
    videoList: {
      type: Array,
      default: []
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      play: '',
      pause: '',
      timer: null,
      playTime: '00:00',
      progressWidth: 0,
    }
  },
  filters: {
    setCount: function (val) {
      return filterSetPlayCount(val)
    },
    setTime: function (val) {
      return filterSetTime(val)
    }
  },
  created() {
    console.log(this.videoList)
  },
  computed: {
    ...mapGetters([
      'VideoList'
    ])
  },
  methods: {
    artistImg(item) {
      return item.data.vid ? item.data.creator.avatarUrl : item.data.artists[0].img1v1Url
    },
    artistName(item) {
      return item.data.vid ? item.data.creator.nickname : item.data.artists[0].name
    },
    likeCount(item) {
      return item.data.vid ? item.data.praisedCount : item.data.likeCount
    },
    Duration(item) {
      return item.data.vid ? item.data.durationms : item.data.duration
    },
    Title(item) {
      return item.data.vid ? item.data.title : item.data.name
    },
    Playcount(item) {
      return item.data.vid ? item.data.playTime : item.data.playCount
    },
    enterVideo(item) {
      let id = item.data.vid
      if(id) {
        this.$router.push({
          path: 'videodetail',
          query: {
            id
          }
        })
      }
    },
    startPlay (index) {
      this.$refs.load[index].none()
    },
    setBarTime (index) {
      const video = this.$refs.video[index]
      let minutes = Math.floor(video.currentTime / 60)
      let seconds = Math.floor(video.currentTime - minutes * 60)
      let minuteValue
      let secondValue
      if (minutes < 10) {
        minuteValue = '0' + minutes
      } else {
        minuteValue = minutes
      }
      if (seconds < 10) {
        secondValue = '0' + seconds
      } else {
        secondValue = seconds
      }
      let audioTime = minuteValue + ':' + secondValue
      this.playTime = audioTime
      let barLength = video.currentTime / video.duration * 100
      this.setProgress(barLength)
    },
    setProgress (val) {
      if (val < 0 || val > 100) {
        return
      }
      this.progressWidth = val
    },
    changeTime (time, index) {
      const video = this.$refs.video[index]
      const current = time * video.duration / 100
      video.currentTime = current
      this.playVideo(video, index)
    },
    togglePlaying(index, item) {
      let vid = item.data.vid
      let id = item.data.id
      if(!isNaN(lastIndex)) {
        if(lastIndex !== index) {
          this.stopVideoTag(lastIndex)
        }
      }
      lastIndex = index
      this.$nextTick(() => {
        const video = this.$refs.video[index]
        if (video.src.includes('localhost')) {
          if(item.data.vid) {
            getVideoUrl(vid).then(res => {
              if(res.code === ERR_OK) {
                console.log(res)
                video.src = res.urls[0].url
              }
            })
          }else {
            getMVUrl(id).then(res => {
              if(res.code === ERR_OK) {
                console.log(res)
                video.src = res.data.url
              }
            })
          }
        }
        this.showVideoTag(index)
        this.showFnBtn(index)
        if (video.paused) {
          this.playVideo(video, index)
        } else {
          this.pauseVideo(video, index)
        }
      })
    },
    playVideo(video, index) {
      setTimeout(() => {
        video.play()
      }, 1000)
      this.play = `play${index}`
      this.pause = ``
      this.hideFnBtn(index)
    },
    pauseVideo(video, index) {
      setTimeout(() => {
        video.pause()
      }, 1000)
      this.hideFnBtn(index)
      this.pause = `pause${index}`
      this.play = ``
    },
    showFnBtn (index) {
      this.$refs.fnBtn[index].style.zIndex = 1
      this.play = `play${index}`
    },
    hideFnBtn (index) {
      const _self = this
      this.showFnBtn(index)
      _self.$refs.fnBtn[index].style.display = 'block'
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(function () {
        _self.$refs.fnBtn[index].style.display = 'none'
      }, 2000)
    },
    stopVideoTag(index) {
      const i = index || lastIndex
      if (!isNaN(i)) {
        const video = this.$refs.video[i]
        this.hideVideoTag(i)
        video.pause()
        video.currentTime = 0
      }
    },
    showVideoTag (index) {
      const videoBtn = this.$refs.playVideo[index]
      videoBtn.style.zIndex = 1
    },
    hideVideoTag (index) {
      const videoBtn = this.$refs.playVideo[index]
      videoBtn.style.zIndex = '-1'
    }
  }
}
</script>

<style lang="scss" scoped>
.video {
  width: 100%;
  height: 100%;
  padding: 0 11.5px;
  box-sizing: border-box;
  .video-item {
    width: 100%;
    .video-info {
      display: flex;
      justify-content: center;
      position: relative;
      width: 100%;
      padding-bottom: 195px;
      height: 0;
      margin-top: 11.5px;
      img {
        display: block;
        width: 345px;
        border-radius: 10px;
        height: 195px;
      }
      .none {
        display: none;
      }
      .play-video {
        position: absolute;
        top: 0;
        width: 345px;
        height: 195px;
        background-color: #222;
        border-radius: 10px;
        z-index: -1;
        .video_tag {
          position: absolute;
          width: 345px;
          border-radius: 10px;
          height: 195px;
        }
        .fn-btn {
          width: 345px;
          height: 195px;
          .center-bofang {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.7;
            .iconPlay {
              font-size: 45px;
              color: rgba(255, 255, 255, 0.7);
            }
            .iconPause {
              font-size: 45px;
              color: rgba(255, 255, 255, 0.7);
            }
          }
          .bar {
            position: absolute;
            bottom: -15px;
            left: 5px;
            right: 5px;
          }
        }
      }
      .go-count {
        position: absolute;
        bottom: 5px;
        left: 5px;
        box-sizing: border-box;
        font-size: 10px;
        color: #fff;
        padding: 2px 6.5px;
        .icon-pause {
          font-size: 12px;
          margin-right: 3px;
        }
      }
      .go-time {
        position: absolute;
        bottom: 5px;
        right: 5px;
        box-sizing: border-box;
        font-size: 10px;
        color: #fff;
        padding: 2px 6.5px;
        .icon-test {
          font-size: 10px;
          margin-right: 3px;
        }
      }
      .tag {
        position: absolute;
        top: 10px;
        right: 6.5px;
        box-sizing: border-box;
        font-size: 10px;
        color: #fff;
        padding: 2px 6.5px;
        border-radius: 15px;
        border: 1px solid #777;
      }
      .center-bofang {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0.7;
        .icon-pause,
        .icon-play {
          font-size: 45px;
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }
    .title {
      line-height: 1.5;
      margin: 10px 0 0 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      overflow: hidden;
      -webkit-box-orient: vertical;
      font-weight: normal;
      font-size: 14px;
    }
    .bottom {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      .creator {
        display: flex;
        align-items: center;
        .name {
          max-width: 150px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .img-info {
          width: 25px;
          height: 0;
          padding-bottom: 25px;
          margin-right: 3px;
          img {
            width: 25px;
            height: 25px;
            border-radius: 50%;
          }
        }
      }
    .button {
      display: flex;
      justify-content: space-between;
      width: 130px;
      color: #000;
    .praised,
    .comment {
      position: relative;
      .iconfont {
        font-size: 18px;
        margin-right: 4px;
      }
      .num {
        font-size: 12px;
        color: #999;
      }
    }
    .share {
      .icon-dot-copy {
        font-size: 20px;
      }
    }
  }
    }
    .split {
      width: 100%;
      height: 6.5px;
      background-color: #eee;
      margin: 15px 0;
    }
  }
}
</style>