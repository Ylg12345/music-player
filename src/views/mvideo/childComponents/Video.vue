<template>
  <div class="play-video" ref="playVideo" @touchstart="hideFnBtn">
    <video
      @timeupdate="setBarTime"
      class="video_tag"
      ref="video"
      src="localhost"
    ></video>
    <div class="fn-btn" ref="fnBtn" @click.stop>
      <span class="center-bofang" ref="button" @click="togglePlaying(videoId)">
        <i
        class="iconfont"
        :class="{iconPause: pause === `pause`, iconPlay: play === `play`}"
        ></i>
      </span>
      </span>
      <progress-bar
      class="bar"
      :allTime="allTime"
      :time="playTime"
      :width="progressWidth"
      @time="changeTime"
      >
      </progress-bar>
    </div>
  </div>
</template>

<script>

import { filterSetPlayCount, filterSetTime } from 'common/js/filters'
import {getVideoUrl} from 'network/video'
import {ERR_OK} from 'network/config'
import {mapMutations, mapGetters} from 'vuex'
import ProgressBar from './ProgressBar'

export default {
  components: {
    ProgressBar
  },
  data () {
    return {
      pause: 'pause',
      play: '',
      timer: null,
      playTime: '00:00',
      progressWidth: 0
    }
  },
  props: {
    videoId: {
      type: String
    },
    allTime: {
      type: Number
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
  methods: {
    togglePlaying(id) {
      this.$nextTick(() => {
        const video = this.$refs.video
        if (video.src.includes('localhost')) {
          getVideoUrl(id).then(res => {
            if(res.code === ERR_OK) {
              video.src = res.urls[0].url
            }
          })
        }
        if (video.paused) {
          this.playVideo(video)
        } else {
          this.pauseVideo(video)
        }
      })
    },
    setBarTime () {
      const video = this.$refs.video
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
    playVideo (video) {
      video.play()
      this.play = `play`
      this.pause = ``
      this.hideFnBtn()
    },
    changeTime (time) {
      const video = this.$refs.video
      const current = time * video.duration / 100
      video.currentTime = current
      this.playVideo(video)
    },
    pauseVideo (video) {
      video.pause()
      this.hideFnBtn()
      this.pause = `pause`
      this.play = ``
    },
    hideFnBtn () {
      const _self = this
      _self.$refs.fnBtn.style.display = 'block'
      _self.$emit('blockNav')
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(function () {
        _self.$refs.fnBtn.style.display = 'none'
        _self.$emit('hideNav')
      }, 2000)
    }
  }
}
</script>

<style lang='scss' scoped>
.play-video {
  position: relative;
  width: 100%;
  height: 220px;
  background-color: #222;
  .video_tag {
    position: absolute;
    width: 100%;
    border-radius: 10px;
    height: 100%;
  }
  .fn-btn {
    width: 100%;
    height: 100%;
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
</style>
