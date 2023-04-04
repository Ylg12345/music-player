<template>
  <div class="find-songlist">
    <disc-list
    :playlists="playlists"  
    toptitle="推荐歌单"
    toptomany="歌单广场"
    ></disc-list>
  </div>
</template>

<script>

import DiscList from 'components/content/disclist/DiscList'

export default {
  components: {
    DiscList
  },
  props: {
    playlists: {
      type: Array,
      default: []
    }
  },
}
</script>

<style lang="scss" scoped>
.find-songlist {
  width: 100%;
  box-sizing: border-box;
}
</style>