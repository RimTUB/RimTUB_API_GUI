<script setup>
import API_CONFIG from '@/config/api.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const tokenInput = ref('')
const errorMessage = ref('')
const router = useRouter()

const setToken = async () => {
  try {
    localStorage.setItem('authToken', tokenInput.value)
    await API_CONFIG.get('/accounts/get_me/')
    errorMessage.value = ''
    router.push('/')
  } catch (error) {
    localStorage.removeItem('authToken')
    errorMessage.value = 'Invalid token. Please try again.'
    console.error('Token validation failed:', error)
  }
}
</script>

<template>
  <div class="container-login">
    <div class="login">
      <h1 class="login__title center">Insert Token</h1>
      <form @submit.prevent="setToken">
        <input
          class="login__input input-reset"
          type="text"
          v-model="tokenInput"
          required
          placeholder="Enter your token"
        />
        <p class="login__msg" v-if="errorMessage">{{ errorMessage }}</p>
        <div class="login-wrapper">
          <button class="login__btn btn btn-reset" type="submit">Set Token</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/mixins' as *;
@use '@/styles/base' as *;
@use '@/styles/settings' as *;

.container-login {
  @include fcc;

  height: 100vh;
}

.login {
  @include fcc;

  min-width: 30%;
  margin: auto;
  padding: rem(20);
  border: rem(1) solid $color-border;
  border-radius: rem(5);
  background-color: $color-background;

  &__title {
    margin: 0;
    margin-bottom: rem(15);
    font-size: rem(24);
    color: $color-text-primary;
  }

  &__msg {
    margin-top: rem(10);
    margin-bottom: 0;
    font-size: rem(17);
    color: $color-error;
  }

  input {
    width: 100%;
    padding: rem(10);
    border: rem(1) solid $color-border;
    border-radius: rem(5);
    font-size: rem(18);

    &::placeholder {
      color: $color-text-secondary;
      font-size: rem(12);
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      border-color: $color-primary;
    }
  }

  &-wrapper {
    @include fvc;
  }

  &__btn {
    margin-top: rem(20);
  }
}
</style>
