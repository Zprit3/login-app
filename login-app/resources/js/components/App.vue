<template>
    <div class="container mx-auto p-4">
        <Register />
        <Login />
    </div>
    </template>
    
    <script>
    import Register from './Register.vue';
    import Login from './Login.vue';  
    
    export default {
        components: {
            Register,
            Login
        }
    }
    </script>