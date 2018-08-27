// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import VueLocalStorage from 'vue-localstorage'
import {store} from './stores'
import VueSocketio from 'vue-socket.io'
import io from 'socket.io-client'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import Notification from 'vue-notification'
import {v1} from 'uuid'

let clientID = window.localStorage.getItem('clientID')
if (!clientID) {
  clientID = v1()
  window.localStorage.setItem('clientID', clientID)
}

const guestObj = window.localStorage.getItem('guestObj')
const userObj = window.localStorage.getItem('userObj')

const socketServer = 'http://192.168.1.182:3000'
const socketInstance = io(socketServer, {
  query: {clientID, guestObj, userObj}
})

Vue.config.productionTip = false

Vue.use(Notification)
Vue.use(VueResource)
Vue.use(VueSocketio, socketInstance)
Vue.use(VueLocalStorage)
Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  sockets: {
    connect: (ret) => console.log('socket connected'),
    init: console.log
  }
})
