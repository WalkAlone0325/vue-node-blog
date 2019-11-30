import Main from '../views/Main'

export default [
  {
    path: '/',
    component: Main,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/article',
        name: 'article',
        component: () => import('../views/Article.vue')
      },
      {
        path: '/article/:id',
        name: 'articledetail',
        component: () => import('../views/ArticleDetail.vue')
      },
      {
        path: '/archives',
        name: 'archives',
        component: () => import('../views/Archive.vue')
      },
      {
        path: '/project',
        name: 'project',
        component: () => import('../views/Project.vue')
      },
      {
        path: '/record',
        name: 'record',
        component: () => import('../views/Record.vue')
      },
      {
        path: '/link',
        name: 'link',
        component: () => import('../views/Link.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/About.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
      },
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
]