import Home from '../views/Home.vue'
import Login from '../views/Login/Login'
import Dashbord from '../views/Dashbord/Dashbord'

/**
 * hidden： 是否为blank页面
 * isPublic 是否为空开访问
 * notLogin
 */
export default [
  {
    path: "/login",
    name: "login",
    component: Login,
    hidden: true,
    meta: { title: '登录', isPublic: true, }
  },
  {
    path: "/",
    name: "home",
    component: Home,
    redirect: '/dashbord',
    hidden: false,
    meta: {},
    children: [
      {
        path: "/dashbord",
        name: "dashbord",
        component: Dashbord,
        meta: { title: '首页', icon: 'el-icon-menu' }
      },
      {
        path: "/tag",
        name: "tag",
        component: () => import('../views/Tag/Tag.vue'),
        meta: {
          title: '标签管理', icon: 'el-icon-collection-tag'
        }
      },
      {
        path: "/page",
        name: "page",
        component: () => import("../views/PageAdmin/Index.vue"),
        redirect: '/page/homepage',
        meta: { title: '页面管理', icon: 'el-icon-s-operation' },
        children: [
          {
            path: "/page/homepage",
            name: "homepage",
            component: () => import("../views/PageAdmin/HomePage.vue"),
            meta: { title: '技能管理', icon: 'el-icon-s-home' }
          },
          {
            path: "/page/project",
            name: "projectpage",
            component: () => import("../views/PageAdmin/ProjectPage.vue"),
            meta: { title: '项目管理', icon: 'el-icon-s-order' }
          },
          {
            path: "/page/aboutpage",
            name: "aboutpage",
            component: () => import("../views/PageAdmin/AboutPage.vue"),
            meta: { title: '关于管理', icon: 'el-icon-user-solid' }
          },
        ],
      },
      {
        path: "/article",
        name: "article",
        component: () => import("../views/ArticleAdmin/Index.vue"),
        redirect: '/article/list',
        meta: { title: '文章管理', icon: 'el-icon-s-management' },
        children: [
          {
            path: "/article/edit",
            name: "articleedit",
            component: () => import('../views/ArticleAdmin/ArticleEdit.vue'),
            meta: { title: '新建文章', icon: 'el-icon-circle-plus' }
          },
          {
            path: "/article/edit/:id",
            hidden: true,
            component: () => import('../views/ArticleAdmin/ArticleEdit.vue'),
            meta: { title: '编辑文章', icon: 'el-icon-menu' },
            props: true
          },
          {
            path: "/article/list",
            name: "articlelist",
            component: () => import("../views/ArticleAdmin/ArticleList.vue"),
            meta: { title: '文章列表', icon: 'el-icon-s-order' }
          },
          {
            path: "/article/record",
            name: "articlerecord",
            component: () => import("../views/ArticleAdmin/RecordList.vue"),
            meta: { title: '文章收录', icon: 'el-icon-star-on' }
          }
        ],
      },
      {
        path: '/link',
        name: 'link',
        component: () => import('../views/Link/Index.vue'),
        redirect: '/link/friendly',
        meta: {
          title: '链接管理', icon: 'el-icon-link'
        },
        children: [
          {
            path: '/link/friendly',
            name: 'friendly',
            component: () => import('../views/Link/FriendlyLink.vue'),
            meta: {
              title: '友情链接', icon: 'el-icon-s-promotion'
            },
          },
          {
            path: '/link/tools',
            name: 'tools',
            component: () => import('../views/Link/ToolLink.vue'),
            meta: {
              title: '工具链接', icon: 'el-icon-s-tools'
            },
          },
        ]
      },
      {
        path: "/loginadmin",
        name: "loginadmin",
        component: () => import('../views/Login/LoginAdmin.vue'),
        meta: {
          title: '管理员', icon: 'el-icon-s-custom'
        }
      },
    ]
  },
]
