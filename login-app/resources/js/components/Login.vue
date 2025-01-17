<template>
  <div>
    <Loading :isLoading="isLoading" />
    <div class="bg-gray-100 min-h-screen flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Iniciar Sesión</h2>
        <Alert v-if="alertMessage" :message="alertMessage" :title="alertTitle" :type="alertType" @close="alertMessage = null" />
        <form @submit.prevent="loginUser">
          <div class="mb-4">
            <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
            <input type="email" id="email" v-model="form.email" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            <div v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</div>
          </div>
          <div class="mb-6">
            <label for="password" class="block text-gray-700 font-medium mb-2">Contraseña</label>
            <input type="password" id="password" v-model="form.password" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            <div v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</div>
          </div>
          <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition duration-300">Iniciar Sesión</button>
        </form>
        <p class="mt-4 text-center text-gray-600">¿No tienes una cuenta? <router-link to="/register" class="text-blue-500 hover:underline">Regístrate</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Alert from './Alert.vue';
import Loading from './Loading.vue';

export default {
  components: {
    Alert,
    Loading,
  },
  setup() {
    const form = reactive({
      email: '',
      password: '',
    });
    const router = useRouter();
    const alertMessage = ref(null);
    const alertTitle = ref(null);
    const alertType = ref(null);
    const emailError = ref(null);
    const passwordError = ref(null);
    const isLoading = ref(false);

    const loginUser = async () => {
      isLoading.value = true;
      emailError.value = null;
      passwordError.value = null;
      alertMessage.value = null;
      alertTitle.value = null;
      alertType.value = null;

      if (!form.email) {
        emailError.value = 'El email es obligatorio.';
        isLoading.value = false;
        return;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        emailError.value = 'El email no es válido.';
        isLoading.value = false; 
        return;
      }

      if (!form.password) {
        passwordError.value = 'La contraseña es obligatoria.';
        isLoading.value = false;
        return;
      }

      try {
        const response = await axios.post('/api/login', form);
        localStorage.setItem('token', response.data.token);
        form.email = '';
        form.password = '';
        alertMessage.value = 'Inicio de sesión exitoso';
        alertTitle.value = 'Ingreso Exitoso';
        alertType.value = 'success';
        router.push('/profile');
      } catch (err) {
        console.error(err.response.data);
        alertMessage.value = err.response.data.message || 'Error al iniciar sesión. Verifica tus credenciales.';
        alertTitle.value = 'Error';
        alertType.value = 'error';
      } finally {
        isLoading.value = false;
      }
    };

    return { form, loginUser, router, alertMessage, alertTitle, alertType, emailError, passwordError, isLoading };
  },
};
</script>