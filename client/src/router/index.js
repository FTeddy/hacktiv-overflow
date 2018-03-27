import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ThreadsList from '@/components/ThreadsList'
import Thread from '@/components/Thread'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/list',
      name: 'ThreadsList',
      component: ThreadsList
    },
    {
      path: '/list/:threadId',
      name: 'Thread',
      props: true,
      component: Thread
    }
  ]
})
