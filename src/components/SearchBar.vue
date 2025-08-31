<script setup>
import { ref, inject } from 'vue'
import API_CONFIG from '@/config/api.js'

const searchQuery = ref('')
const modules = inject('modules')

const searchModules = async () => {
  try {
    const response = await API_CONFIG.get(`/search_modules/?query=${searchQuery.value}`)
    const modulesInfo = response.data

    // for (const module of modulesInfo) {
    //   const getResponse = await API_CONFIG.get(`/get_module/${module.id}`)
    //   console.log(getResponse.data);
    //   const versionsResponse = await API_CONFIG.get(`/get_module_versions/${module.id}`)
    //   const versions = versionsResponse.data
    //   console.log(versions);

    //   const moduleId = versions.map(version => version.module_id)
    //   console.log(`Module ID: ${moduleId}`);

    // }
    modules.value = modulesInfo
  } catch (error) {
    console.error('Error searching modules:', error)
  }
}
</script>

<template>
  <div class="search-bar">
    <input
      class="search-bar__input input-reset"
      v-model="searchQuery"
      @keyup.enter="searchModules"
      type="text"
      placeholder="Search..."
    />
    <button @click="searchModules" class="search-bar__btn btn-reset">Search</button>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/mixins' as *;
@use '@/styles/base' as *;
@use '@/styles/settings' as *;

.search-bar {
  @include fhc;

  padding-top: rem(80);
  column-gap: rem(20);

  &__input {
    border: rem(2) solid $color-border;
    border-radius: rem(5);
    padding: rem(6) rem(10);
    min-width: rem(250);
    font-size: rem(18);

    &::placeholder {
      color: $color-text-secondary;
      font-size: rem(12);
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      border-color: $color-accent;
    }
  }

  &__btn {
    border-radius: rem(5);
    padding: rem(10) rem(15);
    color: $color-text-primary;
    background-color: $color-secondary;
    transition:
      color var(--transition),
      background-color var(--transition);

    @include hover {
      color: $color-text-secondary;
      background-color: $color-accent;
    }
  }
}
</style>
