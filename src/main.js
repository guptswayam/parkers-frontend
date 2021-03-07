import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import {routes} from "./route";
import VueRouter from 'vue-router';
import store from "./store/store"


Vue.use(VueRouter);
const router=new VueRouter({
  mode: "history",
  routes
})

Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
