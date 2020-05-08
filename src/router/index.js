import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/', redirect: '/lists'
    },
  {
    path: '/new',
    name: 'NewList',
    component: () => import(/* webpackChunkName: "new" */ '../views/NewList.vue')
  },
  {
    path: '/lists',
    name: 'ViewLists',
    component: () => import(/* webpackChunkName: "lists" */ '../views/ViewLists.vue')
  },
  {
    path: '/find',
    name: 'NearbyBoots',
    component: () => import(/* webpackChunkName: "lists" */ '../views/NearbyBoots.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
