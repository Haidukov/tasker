import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/sign-up',
            name: 'SignUp',
            component: () => import('../components/containers/SignUp')
        },
        {
            path: 'login',
            name: 'Login',
            component: () => import('../components/containers/Login')
        }
    ]
})
