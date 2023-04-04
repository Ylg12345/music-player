<template>
  <div class="radio">
    <pages-nav title="电台"></pages-nav>
    <scroll class="radio-wrapper" ref="wrapper">
      <div class="top"></div>
      <find-slider :banners="banners" @imageload='imageload'></find-slider>
      <radio-icons></radio-icons>
      <disc-list :playlists="djRadios" :isShow=false toptitle="电台推荐"  key="1" v-if="djRadios.length"></disc-list>
      <disc-list :playlists="paylist" :isShow=false toptitle="精品推荐" toptomany="全部精品" key="2" v-if="paylist.length"></disc-list>
    </scroll>
  </div>
</template>

<script>

import {getRadioBanners, getRadioRecommend, getRadioHot} from 'network/radio'
import {mapGetters, mapMutations} from 'vuex'
import {ERR_OK} from 'network/config'
import PagesNav from 'components/common/pagesnav/PagesNav'
import Scroll from 'components/common/scroll/Scroll'
import DiscList from 'components/content/disclist/DiscList'
import FindSlider from 'views/find/childComponents/FindSlider'
import RadioIcons from './childComponents/RadioIcons'

export default {
  components: {
    PagesNav,
    Scroll,
    DiscList,
    FindSlider,
    RadioIcons,
  },
  data() {
    return {
      banners: [],
      djRadios: [],
      paylist: [],
      isImg: false,
    }
  },
  created() {
    this._getRadioBanners()
    this._getRadioRecommend()
    this._getRadioHot()
  },
  computed: {
    ...mapGetters([
      'isRefresh'
    ])
  },
  methods: {
    ...mapMutations({
      setisRefresh: 'SET_IS_REFRESH'
    }),
    _getRadioBanners() {
      getRadioBanners().then(res => {
        if(res.code === ERR_OK) {
          this.banners = res.data
        }
      })
    },
    _getRadioHot() {
      const limit = 3
      getRadioHot(limit).then(res => {
        if(res.code === ERR_OK) {
          this.djRadios = res.data
        }
      })
    },
    _getRadioRecommend() {
      const limit = 6
      getRadioRecommend(limit).then(res => {
        if(res.code === ERR_OK) {
          this.paylist = res.data.list
        }
      })
    },
    imageload() {
      if(!this.isImg) {
        this.$refs.wrapper.refresh()
        this.isImg = true
      }
    },
  },
  watch: {
    isRefresh() {
      if(this.isRefresh === true) {
        this.$refs.wrapper.refresh()
        this.setisRefresh(false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.radio {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 10;
  background: #fff;
  .radio-wrapper {
    width: 100%;
    height: calc(100% - 44px);
    overflow: hidden;  
    .top {
      width: 100%;
      height: 10px;
    }
  }
}
</style>