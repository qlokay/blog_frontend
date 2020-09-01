import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/font/iconfont.css'
import mavonEditor from 'mavon-editor'

import Utile from './lib/utils.js'
import 'mavon-editor/dist/css/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// import VueCookies from 'vue-cookies'
// Vue.use(VueCookies)
// 插件
// 在request拦截器中展示进度条
Vue.use(Utile)
Vue.use(mavonEditor)
axios.interceptors.request.use((config) => {
  config.headers.Authorization = router.app.$session.fentch('token')
  console.log(config)
  NProgress.start()
  return config
})
// 隐藏进度条
axios.interceptors.response.use((config) => {
  NProgress.done()
  return config
})

Vue.prototype.$http = axios
// 请求根路径
axios.defaults.baseURL = 'http://localhost:8888/'
// 允许跨域
// axios.defaults.withCredentials = true
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
