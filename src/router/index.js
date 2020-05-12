import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase"

Vue.use(VueRouter)

const routes = [
    {
        path: '/', redirect: '/lists'
    },
    {
        path: '/edit',
        name: 'EditList',
        meta: {
            header_text: 'Secured edit list page',
            title: 'Carboot Companion | Edit list',
            description: `Edit a list or make a new one.`,
            //requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "edit" */ '../views/EditList.vue'),
        props: true
    },
    {
        path: '/lists',
        name: 'ViewLists',
        meta: {
            header_text: 'Secured list view page',
            title: 'Carboot Companion | View lists',
            description: `This page stores the lists you've made.`,
            //requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "lists" */ '../views/ViewLists.vue')
    },
    {
        path: '/find',
        name: 'NearbyBoots',
        meta: {
            header_text: 'Secured find page',
            title: 'Carboot Companion | Find nearby carboots',
            description: 'Use this page to find carboots near you.',
            //requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "lists" */ '../views/NearbyBoots.vue')        
    },
    {
        path: '/login',
        name: 'LogIn',
        meta: {
            header_text: 'Carboot companion login',
            title: 'Carboot Companion | Log in',
            description: 'Log in to Carboot Companion.',
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/LogIn.vue')
    },
    {
        path: '/signup',
        name: 'SignUp',
        meta: {
            header_text: 'Carboot companion signup',
            title: 'Carboot Companion | Sign up',
            description: 'Sign up for Carboot Companion.',
        },
        component: () => import(/* webpackChunkName: "signup" */ '../views/SignUp.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

/*  eslint-disable no-console */
router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    let myPath = to.fullPath;
    const shortPath = myPath.replace("/", "");
    myPath = `/login?oldPath=${shortPath}`;
    if (requiresAuth && !currentUser) next({
        path: myPath
    });
    else next();
});

export default router
