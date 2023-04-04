<template>
  <div class="nav-scroll" ref="navs">
    <div class="scroll">
      <div class="nav-wrapper">
        <div class="header-item" v-for="(item, index) in topList" :class="{active: index === currentIndex }" @click="toggleItem(item, index)">
          <span>{{Name(item)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    topList: {
      type: Array,
      default: []
    }
  },
  computed: {

  },
  methods: {
    toggleItem(item, index) {
      this.currentIndex = index
      this.$emit('toggleItem', item, index)
    },
    Name(item) {
      if(item.name) {
        return item.name
      }else {
        return item
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-scroll {
  width: 100%;
  box-sizing: border-box;
  margin-top: 8px;
  border-bottom: 1px solid #ddd;
  flex-wrap: nowrap;
  .scroll {
    height: 35px;
    overflow-x: scroll;
    .nav-wrapper {
      display: flex;
      flex-direction: row;
      width: 750px;
      .header-item {
        width: 75px;
        height: 35px;
        box-sizing: border-box;
        padding: 1.5px;
        margin: 0 6px;
        display: flex;
        align-items: center;
        justify-content: center;      
        span {
          font-size: 14px;
        }
      }
      .active {
        border-bottom: 2px solid #dd001b;;
      }
    }
  }
}
</style>