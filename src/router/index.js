import Vue from 'vue'
import Router from 'vue-router'
import PageHome from '@/page/PageHome'
import ThreadShow from '@/page/PageThreadShow'
import PageNotFound from '@/page/PageNotFound'
import Forum from '@/page/Forum'
import Category from '@/page/Category'
import Profile from '@/page/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: PageHome
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: Category,
      props: true
    },
    {
      path: '/forum/:id',
      name: 'Forum',
      component: Forum,
      props: true
    },
    {
      path: '/thread/:id',
      name: 'ThreadShow',
      component: ThreadShow,
      props: true
    },
    {
      path: '/me',
      name: 'Profile',
      component: Profile
    },
    {
      path: '*',
      name: 'NotFound',
      component: PageNotFound
    }
  ],
  mode: 'history'

})
