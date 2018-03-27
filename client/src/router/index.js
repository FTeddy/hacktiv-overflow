import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/Home'
import ThreadsList from '@/components/ThreadsList'
import Thread from '@/components/Thread'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello
    },
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
