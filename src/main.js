import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import Vuelazyload from 'vue-lazyload'
import Fastclick from 'fastclick'
import 'common/scss/index.scss'
import { Input } from 'element-ui';


Vue.config.productionTip = false

Vue.use(Input)
Vue.use(Vuelazyload, {
  preLoad: 1.3,
  loading: require('common/img/default.svg'),
  attempt: 1
})

Fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
