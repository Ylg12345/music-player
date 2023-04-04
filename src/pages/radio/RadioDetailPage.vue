<template>
  <div class="radio-detail">
    <div class="radio-detail-wrapper">
      <div class="radio-creator-bg" :style="Image">
        <div class="cover"></div>
      </div>
      <div class="radio-creator">
        <div class="nav">
          <i class="iconfont icon-back" @click="back"></i>
        </div>
        <div class="content">
          <div class="left">
            <div class="name">{{albumitem.name}}</div>
            <div class="num">{{subCount(djRadio.subCount)}}人已订阅</div>
          </div>
          <div class="right" v-show="!subed" @click.prevent="addDj">
            <svg
              t="1571198266501"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1753"
              width="14"
              height="14"
            >
            <path
              d="M737.792 910.6944a57.2416 57.2416 0 0 1-26.7264-6.656l-197.5296-103.8336-197.5296 103.8336a57.2416 57.2416 0 0 1-83.0464-60.3648l37.6832-220.16L110.848 467.968a57.2928 57.2928 0 0 1 31.744-97.6896L363.52 338.2272 462.1824 138.24a56.832 56.832 0 0 1 51.2-31.8976 56.9344 56.9344 0 0 1 51.2 31.8976l98.7648 200.1408 220.8256 32.0512A57.2928 57.2928 0 0 1 916.48 467.968l-159.7952 155.7504 37.7344 220.16a57.3952 57.3952 0 0 1-56.32 67.0208zM159.8464 430.08l155.2896 151.3984a57.2416 57.2416 0 0 1 16.4352 50.688l-36.6592 213.5552 192-100.9152a57.088 57.088 0 0 1 53.2992 0L732.16 845.7216l-36.6592-213.76a57.344 57.344 0 0 1 16.4352-50.688L867.2768 430.08l-214.6304-31.1808a57.2928 57.2928 0 0 1-43.1104-31.3344l-96-194.56-96 194.56a57.2416 57.2416 0 0 1-43.1104 31.3344z m715.6736 1.024zM509.7984 165.2736z"
              fill="#ffffff"
              p-id="1754"
            />
            </svg>订阅
          </div>
          <div class="right1" v-show="subed" @click.prevent="deleteDj">
            <svg
              t="1571203188806"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2523"
              width="14"
              height="14"
            >
            <path
              d="M926.037333 224.256c-22.016-22.016-57.685333-22.016-79.701333 0L384.853333 685.738667 179.370667 480.256c-22.016-22.016-57.685333-22.016-79.701334 0-22.016 22.016-22.016 57.685333 0 79.701333l239.786667 239.786667c12.458667 12.458667 29.184 17.749333 45.397333 16.213333 16.213333 1.536 32.938667-3.754667 45.397334-16.213333l495.786666-495.786667c22.016-22.016 22.016-57.685333 0-79.701333z"
              fill="#ffffff"
              p-id="2524"
            />
            </svg>已订阅
          </div>
        </div>
      </div>
    </div>
    <change-nav  
    :active="active"
    :count="count"     
    firstNav="详情"
    secondNav="节目"
    @changeToSecond="changeToSecond"
    @changeToFirst="changeToFirst">
    </change-nav>
    <div class="song-list">
      <h1 class="sum-num pd23">共{{count}}期</h1>
      <scroll class="wrapper">
        <song-list
        class="pd23"
        v-for="(item, index) in programs"
        :key="index"
        :songName="item.name"
        :num="index + 1"
        :createTime="item.createTime"
        :listenerCount="item.listenerCount"
        :duration="item.duration"
        :twoLine="true"
        :itemId="item.id"
        type="djList"
        @beginSong="setAudioList(item, index)"
        :nowSong="item.id === currentSong.id"
        ></song-list>
      </scroll>
    </div>
  </div>
</template>

<script>

import {mapActions, mapGetters, mapMutations} from 'vuex'
import {getRadioDetail, getRadioProgram, getRadioSub} from 'network/radio'
import {ERR_OK} from 'network/config'
import ChangeNav from './childComponents/ChangeNav'
import SongList from './childComponents/SongList'
import Scroll from 'components/common/scroll/Scroll'

export default {
  components: {
    ChangeNav,
    SongList,
    Scroll
  },
  data() {
    return {
      djRadio: {},
      count: 0,
      programs: [],
      active: 'second',
      subed: false,
    }
  },
  created() {
    if(!this.albumitem.id) {
      this.$router.push('/radio')
    }
  },
  activated() {
    this.active = 'second'
    this._getRadioDetail()
  },
  computed: {
    ...mapGetters([
      'albumitem',
      'currentSong',
      'isRefresh'
    ]),
    Image() {
      return `background-image:url(${this.albumitem.picUrl})` 
    }
  },
  methods: {
    ...mapMutations({
      setisRefresh: 'SET_IS_REFRESH'
    }),
    ...mapActions([
      'setPlayer'
    ]),
    _getRadioDetail() {
      let rid = this.albumitem.id
      getRadioDetail(rid).then(res => {
        if(res.code === ERR_OK) {
          this.djRadio = res.djRadio
          this._getRadioProgram(rid)
        }
      })
    },
    _getRadioProgram(rid) {
      let limit = this.djRadio.programCount
      getRadioProgram(rid, limit).then(res => {
        if(res.code === ERR_OK) {
          this.count = res.count
          this.programs = res.programs.reverse()
        }
      })
    },
    back() {
      this.$router.push('/radio')
      this.setisRefresh(true)
    },
    subCount(playcount) {
      if(playcount > 100000 && playcount < 100000000) {
        return `${Math.floor(playcount / 10000)}万`
      }else if(playcount >= 100000000) {
        return `${Math.floor(playcount / 100000000)}亿`
      }else {
        return playcount
      }
    },
    changeToFirst () {
      this.active = 'first'
    },
    changeToSecond () {
      this.active = 'second'
    },
    addDj() {
      let rid = this.albumitem.id
      getRadioSub(rid, 1).then(res => {
        if(res.code === ERR_OK) {
          this.subed = true
        }
      })
    },
    deleteDj() {
      let rid = this.albumitem.id
      getRadioSub(rid, 0).then(res => {
        if(res.code === ERR_OK) {
          this.subed = false
        }
      })
    },
    setAudioList(item, index) {
      this.setPlayer({
        list: this.programs,
        index
      })
    },
    showSlider(id) {

    },
  },
  watch: {

  }
}
</script>

<style lang="scss" scoped>
.radio-detail {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 10;
  background: #fff;
  .radio-detail-wrapper {
    position: relative;
    .radio-creator-bg {
      position: relative;
      background-size: 100%;
      background-repeat: no-repeat;
      width: 100%;
      height: 350px;
      top: 0;
      left: 0;
      .cover {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
    .radio-creator {
      position: absolute;
      top: 0;
      width: 100%;
      height: 350px;
      .nav {    
        position: fixed;
        width: 100%;
        top: 0;
        height: 44px;
        line-height: 44px;
        color: rgb(255, 255, 255);
        i {
          font-size: 35px;
          margin-left: 11.5px;
        }
      }
      .content {
        position: absolute;
        bottom: 50px;
        left: 15px;
        display: flex;
        justify-content: space-between;
        width: 100%;
        box-sizing: border-box;
        padding-right: 40px;
        .left {
          .name {
            color: #fff;
            max-width: 200px;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            overflow: hidden;
            -webkit-box-orient: vertical;
            font-size: 15px;
            line-height: 1.5;
          }
          .num {
            line-height: 1.5;
            font-size: 12px;
            color: #999;
          }
        }
        .right {
          box-sizing: border-box;
          position: absolute;
          right: 25px;
          bottom: 0;
          display: flex;
          padding: 0 11.5px;
          height: 25px;
          align-items: center;
          justify-content: center;
          color: #fff;
          background-color: #dd001b;
          border-radius: 20px;
          font-size: 13.5px;  
          .icon {
            margin-right: 5px;
          }  
        }
        .right1 {
          box-sizing: border-box;
          position: absolute;
          right: 25px;
          bottom: 0;
          display: flex;
          padding: 0 11.5px;
          height: 25px;
          align-items: center;
          justify-content: center;
          color: #fff;
          border-radius: 20px;
          border: 1px solid #fff;
          font-size: 13.5px;
          .icon {
            margin-right: 5px;
          }
        }
      }
    }
  }
  .song-list {
    margin-top: -30px;
    .pd23 {
      box-sizing: border-box;
      padding: 0 11.5px;
    }
    .sum-num {
      height: 16px;
      line-height: 16px;
      font-weight: 700;
      font-size: 14px;
    }
    .wrapper {
      position: fixed;
      overflow: hidden;
      width: 100%;
      height: 300px;
    }
  }
}
</style>