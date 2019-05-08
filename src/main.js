// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import AppDate from '@/components/AppDate'
import store from '@/store'
import firebase from 'firebase'

Vue.config.productionTip = false
const firebaseConfig = {
  apiKey: 'AIzaSyB-FuADoURkHAglnM_RqhDJKUh-Mbk8C9Y',
  authDomain: 'banded-oven-222119.firebaseapp.com',
  databaseURL: 'https://banded-oven-222119.firebaseio.com',
  projectId: 'banded-oven-222119',
  storageBucket: 'banded-oven-222119.appspot.com',
  messagingSenderId: '998897710930',
  appId: '1:998897710930:web:73f43e3df93e1ed2'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
Vue.component('AppDate', AppDate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
