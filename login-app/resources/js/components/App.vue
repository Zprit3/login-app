<template>
    <router-view :user="user" />
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const user = ref(null);
        const router = useRouter();

        const getUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                try {
                    const response = await axios.get('/api/user', {
                        headers: {
                            'Cache-Control': 'no-cache, no-store, must-revalidate',
                            'Pragma': 'no-cache',
                            'Expires': '0'
                        }
                    });
                    user.value = response.data;
                } catch (error) {
                    console.error('Error al obtener el usuario:', error);
                    localStorage.removeItem('token');
                    delete axios.defaults.headers.common['Authorization'];
                    user.value = null;
                    router.push('/login');
                }
            } else {
                user.value = null;
                if (router.currentRoute.value.path === '/profile') {
                    router.push('/login');
                }
            }
        };

        const logout = async () => {
            try {
                await axios.post('/api/logout');
                localStorage.removeItem('token');
                delete axios.defaults.headers.common['Authorization'];
                user.value = null;
                router.push('/login');
            } catch (error) {
                console.error('Error al cerrar sesión:', error);
            }
        };

        onMounted(async () => {
            await getUser();
        });

        watch(router.currentRoute, async () => {
            await getUser();
        });

        return { user, logout }; //es necesario retornar el logout
    },
};
</script>