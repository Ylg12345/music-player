<template>
  <div class="sub-dj">
    <pages-nav title="我的电台" @back="backProfile"></pages-nav>
    <scroll class="wrapper">
      <play-list :count="Count" :playlist="djlist" title="我的电台" :isShow="true"></play-list>
    </scroll>
  </div>
</template>

<script>

import PagesNav from 'components/common/pagesnav/PagesNav'
import PlayList from 'views/profile/childComponents/PlayList'
import Scroll from 'components/common/scroll/Scroll'
import {getProfileRDj} from 'network/profile'
import {ERR_OK} from 'network/config'

export default {
  components: {
    PagesNav,
    PlayList,
    Scroll
  },
  data() {
    return {
      djlist: [],
      Count: 0
    }
  },
  activated() {
    this._getProfileRDj()
  },
  methods: {
    backProfile() {
      this.$router.push('/profile')
    },
    _getProfileRDj() {
      const id = localStorage.getItem('accountUid')
      getProfileRDj(id).then(res => {
        if(res.code === ERR_OK) {
          this.djlist = res.djRadios
          this.Count = res.count
          console.log(this.djlist)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sub-dj {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  .wrapper {
    position: fixed;
    width: 100%;
    top: 45px;
    bottom: 0;
    overflow: hidden;
  }
}
</style>