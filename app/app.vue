<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Connexion
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Connectez-vous à votre compte
        </p>
      </div>
      
      <!-- Formulaire de login -->
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Adresse email"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Mot de passe</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Mot de passe"
            />
          </div>
        </div>

        <!-- Messages d'état -->
        <div v-if="message" :class="messageClass" class="rounded-md p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <IconCheckCircle v-if="isSuccess" />
              <IconExclamationTriangle v-else />
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium" :class="messageTextClass">
                {{ message }}
              </p>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// État du formulaire
const form = ref({
  email: '',
  password: ''
})

// État de l'application
const loading = ref(false)
const message = ref('')
const isSuccess = ref(false)

// Classes CSS conditionnelles
const messageClass = computed(() => {
  return isSuccess.value 
    ? 'bg-green-50 border border-green-200' 
    : 'bg-red-50 border border-red-200'
})

const messageTextClass = computed(() => {
  return isSuccess.value 
    ? 'text-green-800' 
    : 'text-red-800'
})

// Gestion de la soumission du formulaire
const handleLogin = async () => {
  loading.value = true
  message.value = ''
  isSuccess.value = false

  try {
    const config = useRuntimeConfig()
    const response = await fetch(`${config.public.apiBase}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: form.value.email,
        password: form.value.password
      })
    })

    const data = await response.json()

    if (response.ok) {
      // Succès
      isSuccess.value = true
      message.value = `Bienvenue ${data.user.email} !`
      console.log('Token:', data.token)
    } else {
      // Erreur
      isSuccess.value = false
      message.value = data.error || 'Une erreur est survenue'
    }
  } catch (error) {
    // Erreur réseau
    isSuccess.value = false
    message.value = 'Erreur de connexion au serveur'
    console.error('Erreur:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style>
/* Styles Tailwind CSS seront inclus automatiquement par Nuxt */
</style>
