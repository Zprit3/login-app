import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Profile from '../components/Profile.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: '/login', 
            component: Login, 
            meta: { title: 'Iniciar Sesión' } 
        },
        { 
            path: '/register', 
            component: Register, 
            meta: { title: 'Registrarse' } 
        },
        { 
            path: '/profile', 
            component: Profile, 
            meta: { requiresAuth: true, title: 'Perfil' } 
        },
        { path: '/', redirect: '/login', meta: { title: 'Redireccionando' } },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !localStorage.getItem('token')) {
        next('/login');
    } else if(to.path === '/profile' && !localStorage.getItem('token')){
        next('/login')
    }
    else if ((to.path === '/login' || to.path === '/register') && localStorage.getItem('token')){
        next('/profile')
    }
    else {
        next();
    }
});

router.afterEach((to, from) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    } else {
        document.title = "Nombre de tu app";
    }
});

export default router;