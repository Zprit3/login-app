<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Registro</h2>
      <Alert v-if="alertMessage" :message="alertMessage" :title="alertTitle" :type="alertType" @close="alertMessage = null"/>
      <form @submit.prevent="registerUser">
        <div class="mb-4">
          <label for="nombre" class="block text-gray-700 font-medium mb-2">Nombre</label>
          <input type="text" id="nombre" v-model="form.nombre" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        </div>
        <div class="mb-4">
          <label for="apellido" class="block text-gray-700 font-medium mb-2">Apellido</label>
          <input type="text" id="apellido" v-model="form.apellido" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        </div>
        <div class="mb-4">
          <label for="numero_telefono" class="block text-gray-700 font-medium mb-2">Número de Teléfono</label>
          <input type="text" id="numero_telefono" v-model="form.numero_telefono" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
          <input type="email" id="email" v-model="form.email" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 font-medium mb-2">Contraseña</label>
          <input type="password" id="password" v-model="form.password" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        </div>
        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition duration-300">Registrarse</button>
      </form>
      <p class="mt-4 text-center text-gray-600">¿Ya tienes una cuenta? <router-link to="/login" class="text-blue-500 hover:underline">Inicia sesión</router-link></p>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Alert from './Alert.vue';

export default {
  components: {
    Alert,
  },
  setup() {
    const form = reactive({
      nombre: '',
      apellido: '',
      numero_telefono: '',
      email: '',
      password: '',
    });
    const errors = ref([]);
    const router = useRouter();
    const alertMessage = ref(null);
    const alertTitle = ref(null);
    const alertType = ref(null);

    const registerUser = async () => {
      errors.value = [];

      if (!form.nombre) {
        errors.value.push('El nombre es obligatorio.');
      }
      if (!form.apellido) {
        errors.value.push('El apellido es obligatorio.');
      }
        if (!form.numero_telefono) {
        errors.value.push('El número de teléfono es obligatorio.');
      }
      if (!form.email) {
        errors.value.push('El email es obligatorio.');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.value.push('El email no es válido.');
      }
      if (!form.password) {
        errors.value.push('La contraseña es obligatoria.');
      } else if (form.password.length < 6) {
        errors.value.push('La contraseña debe tener al menos 6 caracteres.');
      }

      if (errors.value.length > 0) {
        return;
      }

      try {
        await axios.post('/api/register', form);
        form.nombre = '';
        form.apellido = '';
        form.numero_telefono = '';
        form.email = '';
        form.password = '';
        errors.value = [];
        alertMessage.value = 'Usuario registrado con éxito';
        alertTitle.value = 'Registro Exitoso';
        alertType.value = 'success';
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } catch (err) {
        console.error(err.response.data.errors);
        errors.value = Object.values(err.response.data.errors).flat();
        alertMessage.value = 'Error al registrar usuario';
        alertTitle.value = 'Error';
        alertType.value = 'error';
      }
    };

    return { form, errors, registerUser, alertMessage, alertTitle, alertType, router };
  },
};
</script>