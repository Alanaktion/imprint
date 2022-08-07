<template>
    <!-- <app-nav /> -->
    <div v-if="!cryptoAvailable" class="bg-red-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
        This browser or domain is not supported. Verify your browser supports native cryptography, and the site is served over HTTPS.
    </div>
    <router-view></router-view>
</template>

<script setup>
// import AppNav from './components/AppNav.vue'

const cryptoAvailable = 'subtle' in window.crypto
</script>
