import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Auth from '@/components/Auth'
import PostList from '@/components/PostList'
import PostCreate from '@/components/PostCreate'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/post-list',
      name: 'PostList',
      component: PostList
    },
    {
      path: '/post-list/:msg',
      name: 'PostUpdatedList',
      component: PostList
    },
    {
      path: '/post-create',
      name: 'PostCreate',
      component: PostCreate
    },
    {
      path: '/post-create/:pk',
      name: 'PostUpdate',
      component: PostCreate
    },

    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    }
  ]
})
