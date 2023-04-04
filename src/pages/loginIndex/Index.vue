<template>
  <div class="wrapper" @click="goBack">
    <div class="content">
      <div class="phoneLogin" @click.stop="goPhone">手机号登陆</div>
      <div class="phoneLogin" @click.stop="goPhone">邮箱登陆</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack () {
      this.$router.push('/find')
    },
    goPhone () {
      this.$router.push('/phone')
    }
  }
}
</script>

<style lang="scss" scoped>

.wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #dd001b;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    .phoneLogin {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 315px;
      height: 40px;
      border-radius: 20px;
      background-color: #fff;
      color: #dd001b;
      font-weight: 500;
      letter-spacing: 3px;
      margin-bottom: 20px;
    }
  }
}
</style>
