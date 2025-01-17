<template>
    <div v-if="isLoading" class="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
      <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
  </template>
  
  <script>
  export default {
      props:{
          isLoading: Boolean,
      }
  }
  </script>