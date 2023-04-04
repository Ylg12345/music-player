<template>
  <div class="find-recommend">
    <div class="find-recommend-item" @click="findEnter(findRecommendEnter[0])">
      <div class="icon">
        <img src="./findpage/1.svg" alt="">
      </div>
      <span>{{findRecommendText[0]}}</span>
    </div>
    <div class="find-recommend-item" @click="findEnter(findRecommendEnter[1])">
      <div class="icon">
       <img src="./findpage/2.svg" alt="">       
      </div>
      <span>{{findRecommendText[1]}}</span>
    </div>
    <div class="find-recommend-item" @click="findEnter(findRecommendEnter[2])">
      <div class="icon">
        <img src="./findpage/3.svg" alt=""  class="three">
      </div>
      <span>{{findRecommendText[2]}}</span>
    </div>
    <div class="find-recommend-item" @click="findEnter(findRecommendEnter[3])">
      <div class="icon">
        <img src="./findpage/4.svg" alt="">        
      </div>   
      <span>{{findRecommendText[3]}}</span>
    </div>
    <div class="find-recommend-item" @click="selectEnterFM">
      <div class="icon">
        <img src="./findpage/5.svg" alt="">
      </div>
      <span>{{findRecommendText[4]}}</span>
    </div>
  </div>
</template>

<script>

import {getSongListFM} from 'network/find'
import {ERR_OK} from 'network/config'
import {mapActions} from 'vuex'

export default {
  data() {
    return {
      findRecommendText: [],
      findRecommendEnter: ['/datarecommend', '/recommend', '/rank', '/radio']
    }
  },
  created() {
    this.findRecommendText = ['每日推荐', '歌单', '排行榜', '电台', '私人FM']
  },
  computed: {
  },
  methods: {
    ...mapActions([
      'setPlayer',
    ]),
    findEnter(text) {
      if(text === '/recommend') {
        this.$router.push({
          path: `${text}/全部`
        })
      }else {
        this.$router.push({
          path: `${text}`
        })
      }
    },
    selectEnterFM() {
      getSongListFM().then(res => {
        if(res.code === ERR_OK) {
          // 将信息传到播放页面进行播放
          this.startPlay(res.data)
        }
      })
    },
    startPlay(list) {
      this.setPlayer({
        list,
        index: 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.find-recommend {
  position: relative;
  width: 100%;
  height: 95px;
  display: flex;
  justify-content: space-between;
  padding: 10px 5px 15px 15px;
  box-sizing: border-box;
  border-bottom: .5px solid #ccc;
  .find-recommend-item {
    display: flex;
    height: 80px;
    width: 60px;
    justify-content: center;
    position: relative;
    .icon {
      height: 40px;
      width: 40px;
      background-color: red;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 28px;
        height: 28px;
      }
      .three {
        width: 32px;
        height: 32px;       
      }
    }
    span {
      position: absolute;
      color: #000;
      font-size: 13px;
      display: block;
      bottom: 10px;
      letter-spacing: 1px;
    }
  }
}
</style>