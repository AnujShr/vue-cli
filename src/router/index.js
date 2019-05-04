import Vue from 'vue'
import Router from 'vue-router'
import PageHome from '@/components/page/PageHome'
import ThreadShow from '@/components/page/PageThreadShow'
import PageNotFound from '@/components/page/PageNotFound'

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
