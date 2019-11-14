import Main from '../views/Main.vue'

export default [
  {
    path: '/',
    name: 'main',
    redirect: '/home',
    component: Main,
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
        path: '/remuse',
        name: 'remuse',
        component: () => import('../views/Remuse.vue')
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
]