import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css/normalize.css'
import './assets/scss/style.scss'
import http from './api'
import * as filters from './utils/filters'
import VueLazyLoad from 'vue-lazyload'
import './assets/font/iconfont.css'

Vue.config.productionTip = false
Vue.prototype.$http = http
// 注册全局Loading组件
import Loading from './components/loading'
Vue.use(Loading)
Vue.use(VueLazyLoad, {
  loading: require('./assets/images/loading.jpg')
})

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')