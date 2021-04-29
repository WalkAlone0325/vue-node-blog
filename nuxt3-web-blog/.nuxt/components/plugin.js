import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  ArticleCard: () => import('../..\\components\\ArticleCard.vue' /* webpackChunkName: "components/article-card" */).then(c => wrapFunctional(c.default || c)),
  ArticleComp: () => import('../..\\components\\ArticleComp.vue' /* webpackChunkName: "components/article-comp" */).then(c => wrapFunctional(c.default || c)),
  Loading: () => import('../..\\components\\Loading.vue' /* webpackChunkName: "components/loading" */).then(c => wrapFunctional(c.default || c)),
  Logo: () => import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c)),
  TagSide: () => import('../..\\components\\TagSide.vue' /* webpackChunkName: "components/tag-side" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
