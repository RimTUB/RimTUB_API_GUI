<script setup>
import API_CONFIG from '@/config/api.js'
import { inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const modules = inject('modules')
const router = useRouter()

const goToModule = (name) => {
  const encodedName = encodeURIComponent(name)
  router.push(`/module/${encodedName}`)
}

const allModules = async () => {
  try {
    const response = await API_CONFIG.get('/get_modules/')
    modules.value = response.data
  } catch (error) {
    console.error('Error fetching all modules:', error)
  }
}

onMounted(() => {
  allModules()
})
</script>

<template>
  <div v-if="modules.length > 0" class="modules">
    <ul class="list-reset modules__list">
      <li
        @click="goToModule(module.name)"
        class="modules__item"
        v-for="module in modules"
        :key="module.id"
      >
        <h3 class="modules__title">{{ module.name }}</h3>
        <p><span class="important">Author:</span> {{ module.author }}</p>
        <p><span class="important">Description:</span> {{ module.description }}</p>
        <p><span class="important">Downloads:</span> {{ module.downloads }}</p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/mixins' as *;
@use '@/styles/base' as *;
@use '@/styles/settings' as *;

.modules {
  padding-block: rem(50);

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(rem(330), 1fr));
    max-width: rem(1000);
    gap: rem(30);
  }

  &__title {
    margin: 0;
    margin-bottom: rem(15);
  }

  &__item {
    padding: rem(20);
    border: rem(1) solid $color-border;
    border-radius: rem(5);
    box-shadow: 0 0 rem(5) rgba(#000050, 0.1);
    background-color: $color-background;
    cursor: pointer;

    p:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
