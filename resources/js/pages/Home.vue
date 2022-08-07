<template>
    <div class="bg-gray-50">
        <div class="container flex flex-col min-h-screen mx-auto px-4 py-4 md:py-12 lg:py-16">
            <home-brand class="mb-4" />

            <div class="sm:flex items-center my-auto">
                <div>
                    <home-tagline class="mb-6 md:mb-8" />
                    <p class="md:text-lg text-gray-800">
                        Write prose on the web, securely and quickly on all of your devices.
                    </p>
                </div>

                <div class="mt-6 sm:mt-0 sm:ml-auto flex-shrink-0">
                    <div class="bg-white rounded-lg overflow-hidden border shadow-lg">
                        <form class="p-4 md:p-6 border-b" @submit.prevent="login" method="post">
                            <div class="mb-4">
                                <label class="block text-gray-600 text-sm font-semibold mb-1" for="email">
                                    Email address
                                </label>
                                <input
                                    class="input-text"
                                    id="email"
                                    type="email"
                                    autocomplete="email"
                                    v-model="form.email"
                                    required
                                    v-focus
                                >
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-600 text-sm font-semibold mb-1" for="password">
                                    Passphrase
                                </label>
                                <input
                                    class="input-text"
                                    id="password"
                                    type="password"
                                    autocomplete="current-password"
                                    v-model="form.password"
                                    required
                                >
                            </div>
                            <button type="submit" class="btn btn-primary w-full">Sign in</button>
                        </form>
                        <div class="p-4 md:px-6 md:pb-6 bg-gray-50">
                            <p class="text-gray-700 text-sm text-center mb-4">Not signed up?</p>
                            <router-link to="/register" class="btn btn-secondary w-full">Get started</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
// import { useRouter } from 'vue-router'
import HomeBrand from '../components/HomeBrand.vue'
import HomeTagline from '../components/HomeTagline.vue'

const form = reactive({
    loading: false,
    email: '',
    password: '',
})

// const router = useRouter()

const login = () => {
    form.loading = true
    // TODO: log in
}
</script>
