<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(dot, index) in dots" :class="{active: currentDotsIndex === index}"></span>
    </div>
  </div>
</template>

<script>

import BScroll from 'better-scroll'
import {domMethods} from 'common/js/dom'

export default {
  data() {
    return {
      currentDotsIndex: 0,
      dots: []
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    delay: {
      type: Number,
      default: 3000
    }
  },
  created() {
    this.slider = null
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if(this.autoPlay) {
        this._play()
      }
    }, 20)

    window.addEventListener('resize', () => {
      if(!this.slider) {
        return
      }

      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  destroyed() {
    clearTimeout(this.timer)
  },
  methods: {
    // 轮播图(sliderGroup)宽度
    _setSliderWidth(Resize) {
      this.children = this.$refs.sliderGroup.children
      // 拿到父元素（slider）宽度
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      // 动态添加 class、width
      for(var i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        domMethods.addClass(child, 'slider-item')

        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }

      if(this.loop && !Resize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: { /* 循环滚动设置 */
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })
      this.slider.on('scrollEnd', ()=> {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentDotsIndex = pageIndex
        if(this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _play() {
      let pageIndex = this.currentDotsIndex + 1

      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.delay)
    }
  },
}
</script>

<style lang="scss" scoped>
.slider {
  width: 100%;
  position: relative;
  .slider-group {
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      position: relative;
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      div {
        position: relative;
        width: 353px;
        height: 138px;
        margin: 0 auto;
        img {
          margin: 0 auto;
          border-radius: 5px;
          display: block;
          width: 353px;
          height: 138px;
        }
        span {
          position: absolute;
          bottom: 0;
          display: block;  
          color: #fff;
          font-size: 12px;
          padding: 3px 6px;
          opacity: 0.8;
          background: red;
          border-radius: 2px;
          
        }
      }
    }
  }
  .dots {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    bottom: 12px;
    text-align: center;
    .dot {
      display: block;
      margin-right: 10px;
      width: 6px;
      height: 6px;
      background-color: #ebedf0;
      border-radius: 100%;
      opacity: .3;
      &.active {
        background-color: rgb(221, 0, 27);
        opacity: 1;
      }
    }
  }
}
</style>