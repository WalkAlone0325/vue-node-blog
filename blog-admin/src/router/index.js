import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

// 解决路由的NavigationDuplicated警告
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router
