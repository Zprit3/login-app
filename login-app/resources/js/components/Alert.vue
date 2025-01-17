<template>
    <div v-if="message" :class="messageClass" class="px-4 py-3 rounded relative mb-4" role="alert">
      <strong v-if="title" class="font-bold mr-2">{{ title }}</strong>
      <span class="block sm:inline">{{ message }}</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="close">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current text-gray-500 hover:text-gray-800 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    props: {
      message: String,
      title: String,
      type: {
        type: String,
        default: 'info'
      },
      duration: {
          type: Number,
          default: 0
      }
    },
    setup(props, { emit }){
      const show = ref(true);
      const close = () => {
          show.value = false
          emit('close');
      };
  
      if (props.duration > 0) {
        setTimeout(() => {
          close();
        }, props.duration);
      }
  
      return { close, show }
    },
    computed: {
      messageClass() {
        switch (this.type) {
          case 'success':
            return 'bg-green-100 border border-green-400 text-green-700';
          case 'error':
            return 'bg-red-100 border border-red-400 text-red-700';
          case 'warning':
            return 'bg-yellow-100 border border-yellow-400 text-yellow-700';
          default:
            return 'bg-blue-100 border border-blue-400 text-blue-700';
        }
      }
    },
  };
  </script>