<template>
    <div class="bg-gray-50">
        <div class="container flex flex-col min-h-screen mx-auto px-4 py-4 md:py-12 lg:py-16">
            <home-brand class="mb-4" />

            <div class="sm:flex items-center my-auto">
                <div class="max-w-xl">
                    <div class="font-semibold">How encrypted registration works:</div>
                    <ol class="list-inside list-decimal my-4">
                        <li>You pick a passphrase</li>
                        <li>Your browser generates a secret key</li>
                        <li>The secret key is encrypted with your passphrase</li>
                    </ol>
                    <p class="mb-3">Once registered, everything you write is encrypted with your secret key, directly in your browser. Only you can read and modify your data.</p>
                    <p class="font-medium">Your data cannot be recovered if you lose your passphrase. Keep it safe!</p>
                    <button class="btn btn-secondary" type="button" @click="test">Test</button>
                </div>

                <div class="mt-6 sm:mt-0 sm:ml-auto flex-shrink-0">
                    <div class="bg-white rounded-lg overflow-hidden border shadow-lg">
                        <form class="p-4 md:p-6 border-b" @submit.prevent="register" method="post">
                            <div class="mb-4">
                                <label class="block text-gray-600 text-sm font-semibold mb-1" for="name">
                                    Name
                                </label>
                                <input
                                    class="input-text"
                                    id="name"
                                    type="text"
                                    autocomplete="name"
                                    v-model="form.name"
                                    :disabled="form.loading"
                                    required
                                    v-focus
                                >
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-600 text-sm font-semibold mb-1" for="email">
                                    Email address
                                </label>
                                <input
                                    class="input-text"
                                    id="email"
                                    type="email"
                                    v-model="form.email"
                                    :disabled="form.loading"
                                    required
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
                                    autocomplete="new-password"
                                    v-model="form.password"
                                    :disabled="form.loading"
                                    required
                                >
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-600 text-sm font-semibold mb-1" for="password_confirm">
                                    Confirm passphrase
                                </label>
                                <input
                                    class="input-text"
                                    id="password_confirm"
                                    type="password"
                                    autocomplete="new-password"
                                    v-model="form.password_confirm"
                                    :disabled="form.loading"
                                    required
                                >
                            </div>
                            <button
                                class="btn btn-primary w-full"
                                type="submit"
                                :disabled="form.loading"
                            >Create account</button>
                        </form>
                        <div class="p-4 md:px-6 md:pb-6 bg-gray-50">
                            <p class="text-gray-700 text-sm text-center mb-4">Have an account?</p>
                            <router-link to="/" class="btn btn-secondary w-full">Sign in</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue'
import HomeBrand from '../components/HomeBrand'
import HomeTagline from '../components/HomeTagline'
import {
    generateKey,
    exportKey,
    importKey,
    encrypt,
    decrypt,
    generateSalt,
    generateHash,
    deriveKey,
} from '../lib/crypto'

export default {
    components: {
        HomeBrand,
        HomeTagline,
    },
    setup() {
        const form = reactive({
            loading: false,
            name: '',
            email: '',
            password: '',
            password_confirm: '',
        })

        const register = async () => {
            form.loading = true
        }

        const test = async () => {
            // Test key generation
            const key = await generateKey()
            const str = await exportKey(key)
            console.log('key str', str)
            console.log('key reimport', await importKey(str))

            // Test encryption
            const plain = 'This is a test message.'
            const cipher = await encrypt(key, plain)
            console.log('cipher', cipher)
            console.log('plain', await decrypt(key, cipher.iv, cipher.text))

            // Test scrypt
            const password = 'password here'
            const sA = generateSalt()
            console.log('sA', sA)
            const startTime = Date.now()
            const hash = await generateHash(password, sA)
            console.log('scrypt time:', Math.round((Date.now() - startTime) / 100) / 10)
            console.log('hash', hash)

            // Test key derivation
            const sK = generateSalt()
            console.log('sK', sK)
            const startTimeKey = Date.now()
            const derived = await deriveKey(password, sK)
            console.log('key deriv time:', Math.round((Date.now() - startTimeKey) / 100) / 10)
            console.log('derived', derived)
        }

        return {
            form,
            register,
            test,
        }
    },
}
</script>
