import { wrapFunctional } from './utils'

export { default as ArticleCard } from '../..\\components\\ArticleCard.vue'
export { default as ArticleComp } from '../..\\components\\ArticleComp.vue'
export { default as Loading } from '../..\\components\\Loading.vue'
export { default as TagSide } from '../..\\components\\TagSide.vue'

export const LazyArticleCard = import('../..\\components\\ArticleCard.vue' /* webpackChunkName: "components/article-card" */).then(c => wrapFunctional(c.default || c))
export const LazyArticleComp = import('../..\\components\\ArticleComp.vue' /* webpackChunkName: "components/article-comp" */).then(c => wrapFunctional(c.default || c))
export const LazyLoading = import('../..\\components\\Loading.vue' /* webpackChunkName: "components/loading" */).then(c => wrapFunctional(c.default || c))
export const LazyTagSide = import('../..\\components\\TagSide.vue' /* webpackChunkName: "components/tag-side" */).then(c => wrapFunctional(c.default || c))
