import Vue from 'vue'
import Router from 'vue-router'

import login from "../views/login";

// 后台管理页面
import index from "../views/admin/index"
import user from "../views/admin/content/user"
import user_edit from "../views/admin/content/user_edit"
import article from "../views/admin/content/article"
import article_edit from "../views/admin/content/article_edit"
import comment from "../views/admin/content/comment"
import comment_edit from "../views/admin/content/comment_edit"

// 前台页面
import home from '../views/home/index';
import articleInfo from '../views/home/articleInfo';
import more from '../views/home/more';
import search from '../views/home/search';

Vue.use(Router);

export default new Router({
  //去掉url中的/#/
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: '',
      component: home
    },
    {
      path: '/home',
      name: '',
      component: home
    },
    {
      path: '/home/articleInfo',
      name: '',
      component: articleInfo
    },
    {
      path: '/home/more',
      name: '',
      component: more
    },
    {
      path: '/home/search',
      name: '',
      component: search
    },
    {
      path: '/login',
      name: '',
      component: login
    },
    {
      path: '/admin',
      name: '',
      component: index,
      redirect: '/user',
      children: [
        {
          path: '/user',
          name: '',
          component: user,
          meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
          },
        },
        {
          path: '/user_edit',
          name: '',
          component: user_edit,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: '/article',
          name: '',
          component: article,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: '/article_edit',
          name: '',
          component: article_edit,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: '/comment',
          name: '',
          component: comment,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: '/comment_edit',
          name: '',
          component: comment_edit,
          meta: {
            requireAuth: true,
          },
        },
      ]
    },
  ]
})
