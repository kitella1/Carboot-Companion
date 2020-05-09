import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/', redirect: '/lists'
    },
    {
        path: '/edit',
        name: 'EditList',
        component: () => import(/* webpackChunkName: "edit" */ '../views/EditList.vue'),
        props: true
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
