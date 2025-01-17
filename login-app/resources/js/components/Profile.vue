<template>
  <div>
    <Loading :isLoading="isLoading" />
    <div v-if="user" class="bg-gray-100 min-h-screen flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Perfil</h1>
        <div class="space-y-4">
          <div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p class="text-gray-700 font-medium">Email: {{ user.email }}</p>
            </div>
          </div>
          <div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <p class="text-gray-700 font-medium">Número de Teléfono: {{ user.numero_telefono || 'No proporcionado' }}</p>
            </div>
          </div>
          <div>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2 text-gray-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.125a7.5 7.5 0 0114.998 0 .75.75 0 01-.003 0h-.004zm-11.47-5.625a9 9 0 0116.94 0m-16.94 0c-1.186 0-2.3.468-3.21 1.25A9 9 0 003 15.375m16.94 0c1.185 0 2.3.468 3.21 1.251A9 9 0 0121 15.375" />
                </svg>
                <p class="text-gray-700 font-medium">Nombre Completo: {{ user.nombre }} {{ user.apellido }}</p>
              </div>
            </div>
        </div>
        <button @click="logout" class="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-md transition duration-300">Cerrar Sesión</button>
      </div>
    </div>
    <div v-else class="bg-gray-100 min-h-screen flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <p>Cargando información del usuario...</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import Loading from './Loading.vue';
import { ref } from 'vue';

export default {
  components: {
    Loading,
  },
  props: ['user'],
  setup() {
    const router = useRouter();
    const isLoading = ref(false);

    const logout = async () => {
      isLoading.value = true;
      try {
        await axios.post('/api/logout');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      } finally {
        isLoading.value = false;
      }
    };

    return { logout, isLoading };
  },
};
</script>