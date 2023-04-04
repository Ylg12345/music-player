<template>
  <div class="player" ref="player" v-if="currentSong.id">
    <transition name="normal">
      <div class="player-all" v-show="fullScreen">
        <div class="all-player-bg">
        </div>
        <div class="all-player">
          <div class="top-player">
            <i class="iconfont icon-back" @click="back"></i>
            <div class="top-title">
              <p class="song-name">{{currentSongName}}</p>
              <p class="singer-name">
                <span>{{currentSongArName}}</span>
                /
                <span>{{currentSongAlName}}</span>
              </p>
            </div>
          </div>
          <div class="middle-player" @click="isShowLyric" v-show="!showLyric">
            <div class="middle-l">
              <div class="cd-wrapper">
                <div class="cd" :class="rotate">
                  <img class="image" :src="imgLoad">
                </div>
              </div>
            </div>
            <div class="play-lyric">
              <p>{{playingLyric}}</p>
            </div>
            <div class="middle-icons">
              <i class="iconfont icon-collection-green"></i>
              <i class="iconfont icon-download"></i>
              <i class="iconfont icon-comment-one"></i>
            </div>
          </div>
          <scroll class="lyric-wrapper" v-show="showLyric" @click.native="isShowPlayer" ref="lyricwrapper">
            <div class="lyric">
              <div class="lyric-list" v-if="currentLyric">
                <div class="item" v-for="(item, index) in currentLyric.lines"
                :class="{active: currentLineNum === index}" ref="lyricline">
                  {{item.txt}}
                </div>
              </div>
            </div>
          </scroll>
          <div class="bottom">
            <div class="progress-wrapper">
              <span class="time">{{format(this.currentTime)}}</span>
              <div class="progress-bar-wrapper" ref="progressBar" @click="pregressClick">
                <div class="bar-inner">
                  <div class="progress" ref="progress"></div>
                  <div class="btn-wrapper" ref="progressbtn"
                  @touchstart.prevent="progressTouchStart"
                  @touchmove.prevent="progressTouchMove"
                  @touchend.prevent="progressTouchEnd">
                    <div class="progress-btn" ref="pregressBtn"></div>
                  </div>
                </div>
              </div>
              <span class="time">{{timeEnd(this.currentSong)}}</span>
            </div>
            <div class="operators">
              <div class="icon">
                <i :class="togglePlayMode" @click="toggleMode"></i>
              </div>
              <div class="icon" :class="disable">
                <i @click="prev" class="iconfont icon-prev"></i>
              </div>
              <div class="icon" :class="disable">
                <i :class="playPause" @click="togglePlaying"></i>
              </div>
              <div class="icon" :class="disable">
                <i @click="next" class="iconfont icon-next"></i>
              </div>
              <div class="icon">
                <i class="iconfont icon-menu"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click.stop="minienterall">
        <div class="mini-left" :class="rotate">
          <img :src="imgLoad" width="40px" height="40px">
        </div>
        <div class="mini-center">
          <p class="name">{{currentSongAlName}}</p>
          <p class="desc">{{currentSongArName}}</p>
        </div>
        <div class="mini-control" @click.stop="togglePlaying">
          <i :class="playPause"></i>
        </div>
        <div class="mini-control">
          <i class="iconfont icon-menu"></i>
        </div>
      </div>
    </transition>
    <audio :src="SongLoad" ref="audio" @canplay="ready" @error="error" @timeupdate="update"></audio>
  </div>
</template>

<script>

import Lyric from 'lyric-parser'
import {randomPlayList} from 'common/js/utils'
import {getPlayerSong, getSongLyric} from 'network/find'
import {mapMutations, mapGetters} from 'vuex'
import {ERR_OK} from 'network/config'
import {playMode} from '@/store/config'

import Scroll from 'components/common/scroll/Scroll'

const progressBtnWidth = 8

export default {
  components: {
    Scroll,
  },
  data() {
    return {
      isReady: false,
      isReadySong: false,
      songReady: false,
      Song: [],
      currentTime: 0,
      allTime: 0,
      precent: 0,
      showLyric: false,
      currentLineNum: 0,
      currentLyric: null,
      playingLyric: ''
    }
  },
  computed: {
    ...mapGetters([
      'fullScreen',
      'mode',
      'playing',
      'currentIndex',
      'currentSong',
      'playlist',
      'mode',
      'sequencelist',
      'albumitem',
    ]),
    playPause() {
      return this.playing ? 'iconfont icon-play' : 'iconfont icon-pause'
    },
    disable() {
      return this.songReady ? '' : 'icon disCls'
    },
    rotate() {
      return this.playing ? 'play' : 'play pause'
    },
    togglePlayMode() {
      return this.mode === 0 ? 'iconfont icon-sequence' : this.mode === 1 ? 'iconfont icon-loop' : 'iconfont icon-random'
    },
    currentSongName() {
      if(!this.currentSong.album) {
        return this.currentSong.name
      }else {
        return this.currentSong.album.name
      }
    },
    currentSongArName() {
      if(!this.currentSong.album && !this.currentSong.dj) {
        return this.currentSong.ar[0].name
      }else if(this.currentSong.dj) {
        return this.currentSong.name
      }else {
        return this.currentSong.album.artists.name
      }
    },
    currentSongAlName() {
      if(!this.currentSong.album && !this.currentSong.dj) {
        return this.currentSong.al.name
      }else if(this.currentSong.dj) {
        return this.currentSong.dj.nickname
      }else {
        return this.currentSong.alias[0]
      }
    },
    imgLoad() {
      if(this.isReady && !this.currentSong.album && !this.currentSong.dj) {
        if(this.currentSong.al.picUrl) {
          return this.currentSong.al.picUrl
        }else {
          return this.albumitem.picUrl
        }
      }
      if(this.isReady && this.currentSong.album && !this.currentSong.dj) {
        return this.currentSong.album.picUrl
      }
      if(this.isReady && this.currentSong.dj) {
        return this.currentSong.coverUrl
      }
    },
    SongLoad() {
      if(this.isReadySong) {
        return this.Song[0].url
      }
    },
  },
  created() {
    this.touches = {}
  },
  methods: {
    ...mapMutations({
      setmode: 'SET_MODE',
      setplaying: 'SET_PLAYING',
      setfullScreen: 'SET_FULL_SCREEN',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setplaylist: 'SET_PLAY_LIST'
    }),
    _getPlayerSong(id) {
      getPlayerSong(id).then(res => {
        if(res.code === ERR_OK) {
          this.Song = res.data
        }
      })
    },
    _getSongLyric(id) {
      getSongLyric(id).then(res => {
        if(ERR_OK === 200) {
          this.currentLyric = new Lyric(res.lrc.lyric, this.handleLyric)
          if(this.playing) {
            this.currentLyric.play()
          }
        }
      })
    },
    handleLyric({lineNum, txt}) {
      this.currentLineNum = lineNum
      if(lineNum > 5) {
        let lyricline = this.$refs.lyricline[lineNum - 5]
        this.$refs.lyricwrapper.scrollToElement(lyricline, 1000)
      }else {
        this.$refs.lyricwrapper.scrollTo(0, 0, 1000)
      }
      this.playingLyric = txt
    },
    progressTouchStart(e) {
      this.touches.initiated = true
      this.touches.startX = e.touches[0].pageX
      this.touches.left = this.$refs.progress.clientWidth
    },
    progressTouchMove(e) {
      if(!this.touches.initiated) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touches.startX
      const offsetX = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, deltaX + this.touches.left))
      this._offsetX(offsetX)
    },
    progressTouchEnd(e) {
      this.touches.initiated = false
      this.toggleprecent()
    },
    _offsetX(offsetX) {
      this.$refs.progress.style.width = `${offsetX}px`
      this.$refs.progressbtn.style.transform = `translate3d(${offsetX}px, 0, 0)`
    },
    pregressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect()
      const offsetX = e.pageX - rect.left
      this._offsetX(offsetX)
      this.toggleprecent()
    },
    toggleprecent() {
      const totalwidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      this.precent = this.$refs.progress.clientWidth / totalwidth
      this.onProgressBarChange(this.precent)
    },
    onProgressBarChange(precent) {
      this.currentTime = precent * this.allTime / 1000
      this.$refs.audio.currentTime = this.currentTime
      if(!this.playing) {
        this.setplaying(true)
      }
      if(this.currentLyric) {
        this.currentLyric.seek(this.currentTime * 1000)
      }
    },
    togglePlaying() {
      this.setplaying(!this.playing)
      if(this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    minienterall() {
      this.setfullScreen(true)
    },
    back() {
      this.setfullScreen(false)
    },
    prev() {
      if(!this.songReady) {
        return
      }
      let index = this.currentIndex - 1
      if (index < 0) {
        index = this.playlist.length - 1
      }
      this.setCurrentIndex(index)
      this.setplaying(true)
      this.songReady = false
    },
    next() {
      if(!this.songReady) {
        return
      }
      let index = this.currentIndex + 1
      if (index > this.playlist.length - 1) {
        index = 0
      }
      this.setCurrentIndex(index)
      this.setplaying(true)
      this.songReady = false

    },
    ready() {
      this.songReady = true
    },
    error() {
      this.songReady = true
    },
    update(e) {
      this.currentTime = e.target.currentTime
      this.precent = this.currentTime / (this.allTime / 1000)
    },
    format(currentTime) {
      let second = currentTime % 60 | 0
      let minute = currentTime / 60 | 0
      if(second < 10){
        return `${minute}:0${second}`
      }else {
        return `${minute}:${second}`
      }     
    },
    timeEnd(val) {
      this.allTime = val.duration ? val.duration : val.dt ? val.dt : ''
      let second = this.allTime / 1000 % 60 | 0
      let minute = this.allTime / 1000 / 60 | 0
      if(second < 10){
        return `${minute}:0${second}`
      }else {
        return `${minute}:${second}`
      }
    },
    isShowLyric() {
      this.showLyric = true
    },
    isShowPlayer() {
      this.showLyric = false
    },
    toggleMode() {
      if(this.mode === 0) {
        this.setmode(playMode.loop)
      }else if(this.mode === 1) {
        this.setmode(playMode.random) 
      }else {
        this.setmode(playMode.sequence)
      }
    }
  },
  watch: {
    mode() {
      const currentSong = this.currentSong
      if(this.mode === 2) {
        this.setplaylist(randomPlayList(this.playlist))
        this.playlist.forEach((item, index) => {
          if(item === currentSong) {
             this.setCurrentIndex(index)
          }
        })
      }
      if(this.mode === 0) {
        this.setplaylist(this.sequencelist)
        this.playlist.forEach((item, index) => {
          if(item === currentSong) {
             this.setCurrentIndex(index)
          }
        })
      }
    },
    currentSong(newSong, oldSong) {  
      let id
      if(!newSong.id) {
        return
      }
      if(newSong.id === oldSong.id) {
        return
      }
      if(this.currentLyric) {
        this.currentLyric.stop()
      } 
      this.isReady = true
      if(this.currentSong.dj) {
        id = this.currentSong.mainSong.id
      }else {
        id = this.currentSong.id
      }
      this._getPlayerSong(id)
      if(!this.currentSong.dj) {
        this._getSongLyric(this.currentSong.id)
      }
    },
    playing() {
      const audio = this.$refs.audio
      setTimeout(() => {
        this.playing ? audio.play() : audio.pause()
      }, 1000)
    },
    Song(newSong, oldSong) {
      if(newSong === oldSong) {
        return
      }
      setTimeout(() => {
        this.$refs.audio.play()
      }, 1000)
      this.isReadySong = true
    },
    precent(newPrecent, oldPrecent) {
      if(newPrecent > 0 && !this.touches.initiated) {
        const offsetX = newPrecent * (this.$refs.progressBar.clientWidth - progressBtnWidth)
        this._offsetX(offsetX)
      }
      if(newPrecent >= 1 && this.mode !== 1) {
        this.next()
      }
      if(newPrecent >= 1 && this.mode === 1) {
        //this.setCurrentIndex(this.currentIndex)
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        this.currentLyric.seek(0)
      }
    },
    currentIndex(newIndex, oldIndex) {
      if(newIndex !== oldIndex) {
        this.showLyric = false
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.player {
  .player-all {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 20;
    .all-player-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: #9e8d8f;
    }
    .all-player {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      .top-player {
        color: #fff; 
        display: flex;
        justify-content: space-around;
        .icon-back {
          position: absolute;
          font-size: 32px;
          margin-right: 5px;
          top: 5px;
          left: 15px;
        }
        .top-title {
          position: absolute;
          top: 5px;
          left: 60px;
          width: 50%;
          height: 55px;
          .song-name {
            line-height: 1.5;
          }
          .singer-name {
            font-size: 12px;
            color: #bdc3c7;
          }
        }
      }
      .middle-player {
        position: fixed;
        width: 100%;
        top: 80px;
        bottom: 170px;
        white-space: nowrap;
        font-size: 0;
        .middle-l {
          display: inline-block;
          vertical-align: top;
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 80%;
          .cd-wrapper {
            position: absolute;
            left: 10%;
            top: 0;
            width: 80%;
            height: 100%;
            .cd {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              .image {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 10px solid rgba(255, 255, 255, 0.1);
                box-sizing: border-box;
              }
            }
            .play {
              animation: rotate 20s linear infinite;
            }
            .pause {
              animation-play-state: paused;
            }
          }
        }
        .play-lyric {
          width: 100%;
          position: absolute;
          text-align: center;
          top: 330px;
          height: 25px;
          line-height: 25px;
          p {
            font-size: 14px;
            color: #fff;
          }
        }
        .middle-icons {
          display: flex;
          justify-content: space-around;
          align-items: cente;
          position: relative;
          top: 90px;
          i {
              font-size: 30px;
              color: #bdc3c7;
          }
        }
      }
      .lyric-wrapper {
        position: fixed;
        width: 100%;
        top: 80px;
        bottom: 170px;
        overflow: hidden;
        .lyric {
          width: 100%;
          height: 100%;
          .lyric-list {
            width: 80%;
            margin: 0 auto;
            overflow: hidden;
            text-align: center;
            .item {
              line-height: 32px;
              color: rgba(255, 255, 255, 0.5);
              font-size: 14px;
            }
            .active {
              color: #fff;
            }
          }
        }
      }
      .bottom {
        position: absolute;
        bottom: 50px;
        width: 100%;
        box-sizing: border-box;
        padding: 0 11.5px;
        .progress-wrapper {
          margin: 30px 0;
          display: flex;
          align-items: center;
          color: #bdc3c7;
          font-size: 10;
          .time {
            color: #bdc3c7;
            font-size: 10px;
          }
          .progress-bar-wrapper {
            width: 100%;
            margin: 0 8px;
            height: 2px;
            background-color: #95a5a6;
            position: relative;
            .bar-inner {
              height: 2px;
              .progress {
                position: absolute;
                width: 0;
                height: 100%;
                background-color: #ecf0f1;
              }
              .btn-wrapper {
                .progress-btn {
                  position: absolute;
                  top: -3px;
                  border-radius: 50%;
                  width: 8px;
                  height: 8px;
                  background-color: #ecf0f1;
                }
              }
            }
          }
        }
        .operators {
          position: relative;
          left: 10px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          .icon {
             color: #ccc;
            .iconfont {
              font-size: 25px;
            }
            .icon-sequence {
              position: relative;
              bottom: 1px;
              font-size: 22px;
            }
            .icon-pause {
              font-size: 27px;
            }
            .icon-play {
              font-size: 27px;
            }
          }
          .disCls {
            color: #bdc3c7;
          }
        }
      }
    }
  }

  .normal-enter-active,
  .normal-leave-active {
    transition: all 0.4s;
    .top,
    .bottom {
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }
  }
  .normal-enter,
  .normal-leave-to {
    opacity: 0;
    .top {
      transform: translate3d(0, -100px, 0);
    }
    .bottom {
      transform: translate3d(0, 100px, 0);
    }
  }

  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 55px;
    background: #fff;
    border-top: .5px solid #ccc;
    .mini-left {
      flex: 0 0 40px;
      width: 40px;
      padding: 0 10px 0 10px;
      img {
        border: 0;
        border-radius: 50%;
      }
    }
    .play {
      animation: rotate 20s linear infinite;
    }
    .pause {
      animation-play-state: paused;
    }
    .mini-center {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        margin-bottom: 2px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 13px;
      }
      .desc {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 11px;
      }
    }
    .mini-control {
      position: relative;
      flex: 0 0 30px;
      width: 30px;
      height: 30px;
      padding: 0 10px;
      color: #bdc3c7;
      left: 5px;
      i {
        font-size: 24px;
        position: absolute;
        left: 0;
        top: 2px;
      }
    }
  }

  .mini-enter-active,
  .mini-leave-active {
    transition: all 0.4s;
  }
  .mini-enter,
  .mini-leave-to {
    opacity: 0;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>