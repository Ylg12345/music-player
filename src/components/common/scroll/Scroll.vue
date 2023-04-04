<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>

import BSCroll from 'better-scroll'

export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    delay: {
      type: Number,
      default: 20
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    scrollEnd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() { 
      if(!this.$refs.wrapper) {
        return
      }
      this.scroll = new BSCroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        pullUpLoad: this.pullUpLoad,
      })
      if(this.listenScroll) {
        this.scroll.on('scroll', (position)=> {
          this.$emit('scroll',position)
        })
      }
      if(this.scrollEnd) {
        this.scroll.on('scrollEnd', () => {
          if(this.scroll.y <= (this.scroll.maxScrollY + 20)) {
            this.$emit('scrollToEnd')
          }
        })
      }
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.delay)  
    }
  }
}
</script>

<style lang="scss" scoped>

</style>