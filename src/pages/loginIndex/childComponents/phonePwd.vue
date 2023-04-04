<template>
  <account-login>
    <div class="phone-pwd">
      <div class="inp border-bottom">
        <input type="password" v-model="pwd" placeholder="请输入密码" ref="inputs" autofocus="autofocus" />
        <span @click="goForget">忘记密码</span>
      </div>
      <login-btn @click.native="logon" :title="title"></login-btn>
      <!-- 设置提示语 -->
      <alert :is-alert="alert" :alert="alertText"></alert>
      <loading :is-loading="loading"></loading>
    </div>
  </account-login>
</template>

<script>
import {loginStatusFn, userDetail, phoneLogin} from 'network/login'
import {ERR_OK} from 'network/config'
import {mapGetters, mapMutations} from 'vuex'
import loginBtn from 'components/content/button/Button'
import alert from 'components/content/alert/Alert'
import loading from 'components/content/loading/Loading'
import accountLogin from './accountLogin'

export default {
  data () {
    return {
      pwd: '',
      alert: false,
      alertText: '用户名或密码错误',
      title: '登录',
      flag: true,
      title: '登录',
      loading: false,
      loginfile: {}
    }
  },
  computed: {
    ...mapGetters([
      'accountUid',
      'loginState'
    ])
  },
  components: {
    loginBtn,
    alert,
    loading,
    accountLogin
  },
  created () {
    this.changFocus()
  },
  methods: {
    ...mapMutations({
      setloginState: 'SET_LOGIN_STATE',
      setaccountUid: 'SET_ACCOUNT_UID'
    }),
    logon () {
      if (this.flag) {
        if (!this.pwd) {
          this.alertText = '请输入密码'
          // 显示提示信息
          this.alertEvent()
          return
        }
        this.flag = false
        this.Loading()
        // 判断密码是否正确
        this.passwordIsCorrect(this.pwd)
      }
    },
    passwordIsCorrect (pwd) {
      if (!pwd) {
        this.alertText = '请输入密码'
        this.alertEvent()
      }
      let phone = this.$route.query.phone
      this._isSure(phone, pwd)
    },
    _isSure (phone, pwd) {
      phoneLogin(phone, pwd).then(res => {
        if (res.data.code === ERR_OK) {
          console.log(res)
          // 密码正确
          // 将账号存下，以后登录时账号输入框自动填写
          localStorage.setItem('account', phone)
          this.success(res)
        } else {
          this.error(res.msg)
        }
      })
      .catch(error => {
        if (error) {
          // 密码错误
          this.error()
        }
      })
    },
    success (res) {
      // loading 样式隐藏
      this.LoadingEnd()
      // 存取登陆状态
      this._getLoginState(res)
    },
    error (msg) {
      this.alertText = msg || '用户名或密码错误'
      // 显示提示信息
      this.alertEvent()
      // 输入框内容为空
      this.clearInput()
      // loading 样式隐藏
      this.LoadingEnd()
      // 登陆按钮的锁去掉
      this.flag = true
    },
    _getLoginState (res) {
      // 存取用户 id
      let userId = res.data.profile.userId
      if (res.data.code === 200) {
        // 存取用户信息
        let accountInfo = res.data.profile
        // 成功登陆
        // 修改状态为 1
        this.setloginState(1)
        // Vuex在用户刷新的时候loginState会回到默认值false
        // 所以我们需要用到HTML5储存
        // 我们设置一个名为loginState
        localStorage.setItem('loginState', 1)
        // 存入用户头像 昵称
        localStorage.setItem('avatarUrl', accountInfo.avatarUrl)
        localStorage.setItem('nickname', accountInfo.nickname)
        // 存取用户 uid信息
        this.setaccountUid(userId)
        localStorage.setItem('accountUid', userId)
        this._getUserDetail(userId)
      }
    },
    _getUserDetail (uid) {
      userDetail(uid).then(res => {
        console.log(uid)
        if (res.data.code === ERR_OK) {
          localStorage.setItem('level', res.data.level)
          // 跳转到发现页面
          this.$router.push({ path: '/find' })
        }
      })
    },
    LoadingEnd () {
      this.title = '登录'
      this.loading = false
    },
    Loading () {
      this.title = '登录中...'
      this.loading = true
    },
    changFocus () {
      this.$nextTick(() => {
        this.$refs.inputs.focus()
      })
    },
    clearInput () {
      this.pwd = ''
    },
    alertEvent () {
      // 如果输入内容不合法，提示组件显示
      // 显示一段时间后隐藏
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.alert = true
      // 1s 后隐藏组件
      this.timer = setTimeout(() => {
        this.alert = false
      }, 1000)
    },
    goForget () {
      const phone = this.$route.query.phone
      this.$router.push(`/verify?phone=${phone}`)
    },
  },
}
</script>

<style lang="scss" scoped>

.phone-pwd {
  box-sizing: border-box;
  padding: 11.5px;
  .inp {
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    margin-top: 50px;
    input[type="password"] {
      height: 16px;
      padding: 4px 0px;
      font-size: 12px;
      margin-left: 10px;
      flex: 1;
      // 修改 input 输入框里闪烁光标的颜色
      caret-color: #dd001b;
    }
    span {
      font-size: 13px;
      margin-left: 5px;
    }
  }
  .border-bottom::before {
    border-color: #aaa;
  }
}
</style>
