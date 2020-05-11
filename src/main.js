import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false;

let app = '';

const firebaseConfig = {
    apiKey: "AIzaSyC5qvpHqlWbL-XCp22SdhXk2rM03fjlwbw",
    authDomain: "carboot-companion-mad.firebaseapp.com",
    databaseURL: "https://carboot-companion-mad.firebaseio.com",
    projectId: "carboot-companion-mad",
    storageBucket: "carboot-companion-mad.appspot.com",
    messagingSenderId: "74893247290",
    appId: "1:74893247290:web:790f3dd7053872f3714603"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        /* eslint-disable no-new */
        app = new Vue({
            router,
            render: h => h(App)
        }).$mount('#app');
    }
});
