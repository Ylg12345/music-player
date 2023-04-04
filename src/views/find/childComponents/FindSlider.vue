<template>
  <div class="find-slider" v-if="banners.length">
    <slider>
      <div v-for="item in banners">
        <div>
          <img :src="selectImg(item)" @load="imageload">
          <span>{{item.typeTitle}}</span>
        </div>
      </div>
    </slider>
  </div>
</template>

<script>

import Slider from 'components/common/slider/Slider'

export default {
  components: {
    Slider
  },
  props: {
    banners: {
      type: Array,
      default: []
    } 
  },
  methods: {
    imageload() {
      this.$emit('imageload')
    },
    selectImg(item) {
      if(item.encodeId) {
        return item.imageUrl
      }else {
        return item.pic
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.find-slider {
  width: 100%;
  height: 0;
  padding-bottom: 40%;
  box-sizing: border-box;
  overflow: hidden;
}
</style>