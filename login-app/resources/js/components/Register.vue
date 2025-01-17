<template>
    <div class="p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4">Registro</h2>
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">Error!</strong>
      <span class="block sm:inline">{{error}}</span>
    </div>
      <form @submit.prevent="registerUser">
        <div class="mb-4">
          <label for="nombre" class="block text-gray-700 font-bold mb-2">Nombre</label>
          <input type="text" id="nombre" v-model="form.nombre" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300" required>
        </div>
        <div class="mb-4">
          <label for="apellido" class="block text-gray-700 font-bold mb-2">Apellido</label>
          <input type="text" id="apellido" v-model="form.apellido" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300" required>
        </div>
        <div class="mb-4">
          <label for="numero_telefono" class="block text-gray-700 font-bold mb-2">Numero de Telefono</label>
          <input type="text" id="numero_telefono" v-model="form.numero_telefono" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300" required>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-bold mb-2">Email</label>
          <input type="email" id="email" v-model="form.email" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300" required>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-bold mb-2">Contraseña</label>
          <input type="password" id="password" v-model="form.password" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300" required>
        </div>
        <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300">Registrarse</button>
      </form>
    </div>
  </template>
  
  <script>
  import { reactive, ref } from 'vue';
  import axios from 'axios'; //usare axios para hacer las peticiones al servidor
  
  export default {
    setup() {
      const form = reactive({
        nombre: '',
        apellido:'',
        numero_telefono:'',
        email: '',
        password: '',
      });
      const error = ref(null)
  
      const registerUser = async () => {
        try {
          const response = await axios.post('/api/register', form);
          console.log(response.data); 
          form.nombre = '';
          form.apellido = '';
          form.numero_telefono = '';
          form.email = '';
          form.password = '';
          error.value = null;
  
          alert('Usuario registrado con exito')
  
        } catch (err) {
          console.error(err.response.data.errors);
          error.value = Object.values(err.response.data.errors).flat().join('<br>');
        }
      };
  
      return { form, registerUser, error };
    },
  };
  </script>