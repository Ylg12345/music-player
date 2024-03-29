<template>
  <account-login>
    <div class="phone-account">
      <div class="info">未注册手机号登录后将自动创建账号</div>
      <!-- 绑定内联样式 使用 对象 -->
      <div class="inp border-bottom" :style="{opacity}">
        <span>+86</span>
        <input
          type="text"
          v-model.trim="phone"
          placeholder="请输入手机号"
          ref="inputs"
          autofocus="autofocus"
          @input="canShow"
        />
        <i v-show="isShow" class="phone iconfont icon-cancel" @click="clearInput"></i>
      </div>
      <login-btn @click.native="clickEvent"></login-btn>
      <transition>
        <!-- 提示语 -->
        <alert :is-alert="alert" alert="请输入11位数字的手机号"></alert>
      </transition>
    </div>
  </account-login>
</template>

<script>

import accountLogin from './accountLogin'
import loginBtn from 'components/content/button/Button'
import alert from 'components/content/alert/Alert'
import {phoneRegistered} from 'network/login'
import {ERR_OK} from 'network/config'

export default {
  data () {
    return {
      phone: '',
      isShow: false,
      opacity: 0.5,
      alert: false,
      timer: null,
      flag: true
    }
  },
  components: {
    loginBtn,
    alert,
    accountLogin
  },
  created () {
    // 当自动填写后就不自动获取焦点
    if (this.autoFill()) {
      this.changFocus()
    }
  },
  methods: {
    // 在vue生命周期的created()钩子函数进行的DOM操作要放在Vue.nextTick()的回调函数中，
    // 因为created()钩子函数执行的时候DOM并未进行任何渲染，而此时进行DOM操作是徒劳的，所以此处一定要将DOM操作的JS代码放进Vue.nextTick()的回调函数中。
    changFocus () {
      this.$nextTick(x => {
        this.$refs.inputs.focus()
      })
    },
    /**
     * 判断当前输入内容是否合法
     * @param {String} text 手机号
     */
    contextIsTrue (text) {
      let exp = /^1[345789]\d{9}$/
      return exp.test(text)
    },
    /**
     * 给 叉  添加点击事件，点击清空 input
     */
    clearInput () {
      this.phone = ''
      this.canShow()
    },
    /**
     * input事件 判断 叉 是否显示
     * 通过里面是否为空，设置input框样式
     * 空的时候input有opacity
     */
    canShow () {
      this.isShow = this.phone
      if (this.isShow) {
        this.opacity = 1
      } else {
        this.opacity = 0.5
      }
    },
    /**
     * 提示组件的事件
     */
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
    /**
     * 由于在点击时会触发两次请求 设置锁
     * 点击调用事件 进行判断
     */
    clickEvent () {
      if (this.flag) {
        // 将按钮禁用
        this.flag = false
        if (this.contextIsTrue(this.phone)) {
          // 如果输入内容合法 进行下一步操作
          this._determineRegistered(this.phone)
        } else {
          // 如果输入内容不合法
          this.alertEvent()
          // 输入框内容为空
          this.clearInput()
          // 按钮恢复
          this.flag = true
        }
      }
    },
    /**
     * 判断手机号有没有被注册
     * @param {number} phone
     */
    _determineRegistered (phone) {
      phoneRegistered(phone).then(res => {
        if(res.code === ERR_OK) {
          if(res.exist !== -1) {
            this.$router.push({
              path: '/pwd',
              query: {
                phone: this.phone
              }
            })
          }else if(res.exist === -1) {
            this.$router.push({
              path: '/verify',
              query: {
                phone: this.phone
              }
            })
          }
        }
      })

    },
    /**
     * 当内存中有账号信息时自动填写
     */
    autoFill () {
      let phone = localStorage.getItem('account')
      if (phone) {
        this.phone = phone
        this.canShow()
        return true
      }
      return false
    }
  },
  /**
   * Vue 实例销毁后调用。
   * 离开时清除定时器，有利于内存释放
   */
  destroyed () {
    clearTimeout(this.timer)
  },
}
</script>

<style lang="scss" scoped>
.phone-account {
  box-sizing: border-box;
  padding: 0 11.5px;
  .info {
    width: 100vw;
    height: 100px;
    display: flex;
    align-items: center;
    font-size: small;
    color: #ccc;
  }
  .inp {
    padding-bottom: 5px;
    display: flex;
    align-items: center;
    input[type="text"] {
      // IE：不管该行有没有文字，光标高度与font-size一致。
      // FF：该行有文字时，光标高度与font-size一致。该行无文字时，光标高度与input的height一致。
      // Chrome：该行无文字时，光标高度与line-height一致；该行有文字时，光标高度从input顶部到文字底部(这两种情况都是在有设定line-height的时候)，如果没有line-height，则是与font-size一致。
      // 解决的方案：
      // 给input的height设定一个较小的高度，然后用padding去填充，基本上可以解决所有浏览器的问题
      height: 16px;
      padding: 4px 0px;
      font-size: 12px;
      // ---------------------------
      margin-left: 10px;
      flex: 1;
      // 修改 input 输入框里闪烁光标的颜色
      caret-color: red;
    }
    .phone {
      font-size: 16px;
    }
  }
  .border-bottom::before {
    border-color: #aaa;
  }
}
</style>
