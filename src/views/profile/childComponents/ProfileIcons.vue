<template>
  <ul class="icons-wrapper">
    <li class="find-recommend-item" v-for="(item, index) in loginIcons" :key="index" @click="profileEnter(item, index)">
      <div class="icon">
        <i class="login" :class="item.icon"></i>
      </div>
      <span class="icon-text">{{item.text}}</span>
    </li>
  </ul>

</template>

<script>

import {mapActions} from 'vuex'
import {getSongListFM} from 'network/find'
import {ERR_OK} from 'network/config'

export default {
  data () {
    return {
      loginIcons: [
        {
          icon: 'iconfont icon-music',
          text: '私人FM'
        }, 
        {
          icon: 'iconfont icon-history',
          text: '最近播放'
        }, 
        {
          icon: 'iconfont iconradio-two',
          text: '我的电台'
        }, 
        {
          icon: 'iconfont icon-my-collection',
          text: '我的收藏'
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'setPlayer'
    ]),
    profileEnter(item, index) {
      if(index === 0) {
        this._getSongListFM()
      }else if(index === 1) {
        this.$router.push('/rencently')
      }else if(index === 2) {
        this.$router.push('/subdj')
      }
    },
    _getSongListFM() {
      getSongListFM().then(res => {
        if(res.code === ERR_OK) {
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

.icons-wrapper {
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
      .login {
        font-size: 24px;
        color: #fff;
      }
      .iconradio-two {
        font-size: 28px;
      }
    }
    .icon-text {
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
