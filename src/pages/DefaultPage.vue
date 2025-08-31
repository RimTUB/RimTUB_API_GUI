<script setup>
// import { useRoute } from 'vue-router'
import { ref, provide } from 'vue'
import SideBar from '@/components/SideBar.vue'
import SearchBar from '@/components/SearchBar.vue'
import ModulesList from '@/components/ModulesList.vue'

const modules = ref([])
provide('modules', modules)

// const route = useRoute()

// const showComponents = computed(() => route.path !== '/login')
</script>

<template>
  <SideBar />
  <div class="container">
    <SearchBar />
    <ModulesList />
  </div>
</template>
