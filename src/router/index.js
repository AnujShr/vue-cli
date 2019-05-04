import Vue from 'vue'
import Router from 'vue-router'
import PageHome from '@/page/PageHome'
import ThreadShow from '@/page/PageThreadShow'
import PageNotFound from '@/page/PageNotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PageHome',
      component: PageHome
    },
    {
      path: '/thread/:id',
      name: 'ThreadShow',
      component: ThreadShow,
      props: true
    },
    {
      path: '*',
      name: 'NotFound',
      component: PageNotFound
    }
  ],
  mode: 'history'

})
