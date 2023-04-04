<template>
  <div class="title">
    <div class="content" @click="changeToFirst">
      <span class="under-line" :class="{active: active === 'first'}">{{firstNav}}</span>
    </div>
    <div class="content" @click="changeToSecond">
      <span class="under-line" :class="{active: active === 'second'}">{{secondNav}}</span>
      <span class="num">{{count}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    active: {
      type: String,
      default: 'second'
    },
    count: {
      type: Number
    },
    firstNav: {
      type: String
    },
    secondNav: {
      type: String
    }
  },
  methods: {
    changeToFirst () {
      this.$emit('changeToFirst')
    },
    changeToSecond () {
      this.$emit('changeToSecond')
    }
  }
}
</script>

<style lang='scss' scoped>
.under-line {
  position: relative;
  padding-bottom: 12.5px;
}

.under-line::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: #fc2f70;
  transform-origin: center;
  transform: translate(-50%, 0) scaleX(0);
  transition: transform 0.3s ease-in-out;
}

.under-line.active::before {
  transform: translate(-50%, 0) scaleX(1);
}
.title {
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
  transform: translateY(-35px);
  .content {
    flex: 1;
    text-align: center;
    .under-line {
      font-size: 13.5px;
    }
    .num {
      font-size: 12px;
      color: #999;
      margin-left: 5px;
    }
  }
}
</style>
