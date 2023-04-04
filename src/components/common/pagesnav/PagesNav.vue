<template>
  <div class="pagesnav">
    <i @click="back"><img src="~common/img/后退2.svg"></i>
    <span>{{title}}</span>
  </div>
</template>

<script>

import {mapGetters, mapMutations} from 'vuex'

export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters([
      'prevpath'
    ])
  },
  methods: {
    ...mapMutations({
      setisRefresh: 'SET_IS_REFRESH'
    }),
    back() {
      this.$emit('back')
      if(this.title === '排行榜') {
        this.$router.push('/find')
      }
      if(this.title === '云音乐榜单') {
        this.$router.push('/rank')
      }
/*       if(this.title === '榜单') {
        this.$router.push('/find')
      } */
      if(this.title === '歌单广场') {
        this.$router.push('/find')
      }
      if(this.title === '手机号登录') {
        this.$router.push('/login')
      }
      if(this.title === '') {
        this.$router.push('/find')
      }
      if(this.title === '每日推荐') {
        this.$router.push('/find')
      }
      if(this.title === '电台') {
        this.$router.push('/find')
      }
      if(this.title === '全部歌曲') {
        this.$router.push('/singer')
        this.setisRefresh(true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagesnav {
  position: relative;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: #dd001b;
  color: #fff;
  i {
    position: absolute;
    font-size: 24px;
    top: 3px;
    left: 5px;
    img {
      width: 24px;
      height: 24px;
    }
  }
  span {
    display: inline-block;
    font-size: 16px;
    vertical-align: 5px;
  }
}
</style>