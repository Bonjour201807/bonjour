import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/Home'
import Search from '../pages/Search'
import AttractionList from '../pages/AttractionList'
import Attraction from '../pages/Attraction'
import ChatBot from '../pages/ChatBot'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   redirect: '/pages/'
    // },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
    },
    {
      path: '/attractionlist',
      name: 'AttractionList',
      component: AttractionList
    },
    {
      path: '/attraction/:id',
      name: 'Attraction',
      component: Attraction
    },
    {
      path: '/chatbot',
      name: 'ChatBot',
      component: ChatBot
    },
    {
      path: '*',
      redirect: '/pages/'
    }
  ]
})
