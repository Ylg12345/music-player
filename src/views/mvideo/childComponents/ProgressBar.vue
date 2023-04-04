<template>
  <div class="bar">
    <span>{{ time }}</span>
    <div class="bar-bg" ref="barBg" @touchstart.prevent="clickBg">
      <div class="progress"
        @touchstart.prevent="start"
        @touchmove.prevent="move"
        @touchend.prevent="end">
        <div
          class="point"
          :style="{left:length}"
        ></div>
      </div>
      <div class="bar-layer" :style="{width:length}" ref="barlayer"></div>
    </div>
    <span>{{ allTime | setTime }}</span>
  </div>
</template>

<script>

const progressBtnWidth = 8
export default {
  name: '',
  data () {
    return {
      length,
      touch: {}
    }
  },
  props: {
    allTime: {
      type: Number
    },
    time: {
      type: String
    },
    width: {
      type: Number
    },
    index: {
      type: Number
    }
  },
  watch: {
    width: function (val) {
      if (val && !this.touch.state) {
        val = val + '%'
        this.length = val
      }
    }
  },
  methods: {
    clickBg (e) {
      this.touch.width = this.$refs.barBg.clientWidth
      const left = this.$refs.barBg.offsetLeft
      this.touch.endX = e.changedTouches[0].pageX - progressBtnWidth - left
      const offsetWidth = (this.touch.endX - 4) / this.touch.width * 100 
      this.$emit('time', offsetWidth, isNaN(this.index) ? '' : this.index)
    },
    /**
     * 点击小圆点
     */
    start (e) {
      this.touch.state = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.barlayer.clientWidth
      this.touch.width = this.$refs.barBg.clientWidth
    },
    move (e) {
      if (!this.touch.state) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      const width = Math.min(this.$refs.barBg.clientWidth - progressBtnWidth, Math.max(0, deltaX + this.touch.left))
      this.touch.offsetWidth = (width / this.touch.width) * 100
      this._changeWidth(this.touch.offsetWidth)
    },
    end () {
      this.touch.state = false
      this.$emit('time', this.touch.offsetWidth, isNaN(this.index) ? '' : this.index)
    },
    _changeWidth (val) {
      this.length = val + '%'
    }
  },
  filters: {
    /**
     * 将毫秒数转换为正常的时间
     *  212245 ==> 03:32
    */
    setTime: function (value) {
      if (!value) return ''
      let min = parseInt(value / (1000 * 60))
      if (min < 10) {
        min = '0' + min
      }
      let sec = parseInt(value % (1000 * 60) / 1000)
      if (sec < 10) {
        sec = '0' + sec
      }
      value = `${min}:${sec}`
      return value
    }
  }
}
</script>

<style lang='scss' scoped>
.bar {
  margin: 30px 0;
  display: flex;
  align-items: center;
  color: #bdc3c7;
  font-size: 10px;
  .bar-bg {
    width: 100%;
    margin: 0 8px;
    position: relative;
    background-color: #95a5a6;
    .progress {
      position: relative;
      .point {
        position: absolute;
        top: -3px;
        border-radius: 50%;
        width: 8px;
        height: 8px;
        background-color: #ecf0f1;
      }
    }
    .bar-layer {
      height: 2px;
      background-color: #ecf0f1;
    }

  }
}
</style>
