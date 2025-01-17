<template>
    <div class="p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4">Iniciar Sesión</h2>
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">Error!</strong>
      <span class="block sm:inline">{{error}}</span>
    </div>
      <form @submit.prevent="loginUser">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-bold mb-2">Email</label>
          <input type="email" id="email" v-model="form.email" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300" required>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-bold mb-2">Contraseña</label>
          <input type="password" id="password" v-model="form.password" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300" required>
        </div>
        <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300">Iniciar Sesión</button>
      </form>
    </div>
  </template>
  
  <script>
  import { reactive, ref } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const form = reactive({
        email: '',
        password: '',
      });
      const error = ref(null)
  
      const loginUser = async () => {
        try {
          const response = await axios.post('/api/login', form);
          console.log(response.data);
          form.email = '';
          form.password = '';
          error.value = null;
          alert('usuario logeado con exito')
        } catch (err) {
          console.error(err.response.data);
          error.value = err.response.data.message
        }
      };
  
      return { form, loginUser, error };
    },
  };
  </script>