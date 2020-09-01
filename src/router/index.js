import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/client/Login.vue'
// const Login = () => import(/* webpackChunkName: "login_register" */ '../components/client/Login.vue')
import Register from '../components/client/Register.vue'
// const Register = () => import(/* webpackChunkName: "login_register" */ '../components/client/Register.vue')

import Index from '../components/admin/Index.vue'
import Home from '../components/admin/Home.vue'
import Users from '../components/admin/Users.vue'
// const Index = () => import(/* webpackChunkName: "admin_index_home_users" */ '../components/admin/Index.vue')
// const Home = () => import(/* webpackChunkName: "admin_index_home_users" */ '../components/admin/Home.vue')
// const Users = () => import(/* webpackChunkName: "admin_index_home_users" */ '../components/admin/Users.vue')

import Content from '../components/admin/Content.vue'
import Category from '../components/admin/Category.vue'

// const Content = () => import(/* webpackChunkName: "admin_content_category" */ '../components/admin/Content.vue')
// const Category = () => import(/* webpackChunkName: "admin_content_category" */ '../components/admin/Category.vue')

import UserIndex from '../components/client/UserIndex.vue'
import Layout from '../components/client/Layout.vue'
import Blog from '../components/client/Blog.vue'
// const Layout = () => import(/* webpackChunkName: "client_index_blog_home" */ '../components/client/UserIndex.vue')
// const UserIndex = () => import(/* webpackChunkName: "client_index_blog_home" */ '../components/client/Layout.vue')
// const Blog = () => import(/* webpackChunkName: "client_index_blog_home" */ '../components/client/Blog.vue')
import UserHome from '../components/client/UserHome.vue'
import UserPublish from '../components/client/UserPublish.vue'
import UserBlogList from '../components/client/UserBlogList.vue'
import ModifyUserInfo from '../components/client/ModifyUserInfo.vue'
import ChangePass from '../components/client/ChangePass.vue'
import Forum from '../components/client/Forum.vue'
import UserIndexAll from '../components/client/UserIndexAll.vue'
// const UserHome = () => import(/* webpackChunkName: "client_home" */ '../components/client/UserHome.vue')
// const UserPublish = () => import(/* webpackChunkName: "client_home" */ '../components/client/UserPublish.vue')
// const UserBlogList = () => import(/* webpackChunkName: "client_home" */ '../components/client/UserBlogList.vue')
// const ModifyUserInfo = () => import(/* webpackChunkName: "client_home" */ '../components/client/ModifyUserInfo.vue')
// const ChangePass = () => import(/* webpackChunkName: "client_home" */ '../components/client/ChangePass.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/forum',
    component: Forum,
    children: [
      {
        path: '/forum/:categoryID?',
        component: UserIndexAll
      },
      {
        path: '/forum/blog/:contentId?',
        component: Blog
      }
    ]
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/user/home',
    component: UserHome,
    children: [
      {
        path: '/user/publish/:contentId?',
        component: UserPublish
      },
      {
        path: '/user/blog/list',
        component: UserBlogList
      },
      {
        path: '/user/modify',
        component: ModifyUserInfo
      },
      {
        path: '/user/changepass',
        component: ChangePass
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: '/user/:categoryID?',
        component: UserIndex
      },
      {
        path: '/user/blog/:contentId?',
        component: Blog
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/',
        name: '系统首页',
        component: Index
      },
      {
        path: '/users',
        component: Users,
        name: '用户管理'
      },
      {
        path: '/content',
        component: Content,
        name: '内容列表'
      },
      {
        path: '/category',
        component: Category,
        name: '分类列表'
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') {
    return next()
  } else {
    const token = router.app.$session.fentch('token')
    if (token && JSON.stringify(token) !== '{}') {
      return next()
    } else {
      next('/login')
    }
  }
})
export default router
