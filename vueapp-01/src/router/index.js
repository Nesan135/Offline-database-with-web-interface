import Vue from 'vue'
import Router from 'vue-router'
import Registration from '@/components/registration'
import paddyInventory from '@/components/paddyInventory'
import riceInventory from '@/components/riceInventory'

Vue.use(Router)
// register routes here
export default new Router({
  routes: [
    {
      path: '/',
      component: Registration
    },
    {
      path: '/paddy',
      component: paddyInventory
    },
    {
      path: '/rice',
      component: riceInventory
    }
  ]
})
