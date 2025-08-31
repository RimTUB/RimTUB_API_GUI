<script setup>
import { provide } from 'vue'
import { useToast } from 'vue-toastification'

const toastOptions = {
  position: 'top-left',
  timeout: 3000,
  pauseOnHover: false,
  hideProgressBar: true,
  transition: 'Vue-Toastification__fade',
  showCloseButtonOnHover: true
}
const toast = useToast()

provide('toast', toast)
provide('toastOptions', toastOptions)
</script>

<template>
  <router-view />
</template>
