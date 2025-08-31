<script setup>
import CreateModule from '@/components/CreateModule.vue'
import UploadModule from '@/components/UploadModule.vue'
</script>

<template>
  <div class="container">
    <h1 class="center">Create Module</h1>
    <CreateModule />

    <div class="upload-container">
      <h2 class="center">Upload Module Version</h2>
      <UploadModule />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/mixins' as *;

.upload-container {
  padding-block: rem(80);
}
</style>
