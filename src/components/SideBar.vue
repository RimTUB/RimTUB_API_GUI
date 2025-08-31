<script setup>
import API_CONFIG from '@/config/api.js'
import { ref, onMounted } from 'vue'

const usersInfo = ref({})

const getMe = async () => {
  try {
    const response = await API_CONFIG.get('/accounts/get_me/')
    usersInfo.value = response.data
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

onMounted(() => {
  getMe()
})


const fileLabel = ref('File not selected')

const fileUploadChange = (event) => {
  const files = event.target.files
  fileLabel.value = files.length ? [...files].map(f => f.name).join(', ') : 'File not selected'
}


</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__info" v-if="usersInfo && usersInfo.id">
      <h2 class="sidebar__title center">User Info</h2>
      <ul class="sidebar__list list-reset">
        <li class="sidebar__item">
          <p><span class="important">Id:</span> {{ usersInfo.id }}</p>
          <a :href="`tg://user?id=${usersInfo.tg_id}`"
            ><span class="important">Name:</span> {{ usersInfo.name }}</a
          >
          <p><span class="important">Tg id:</span> {{ usersInfo.tg_id }}</p>
          <p v-if="usersInfo.username">
            <span class="important">Username:</span> {{ usersInfo.username }}
          </p>
        </li>
      </ul>
    </div>
    <div class="sidebar__btn center">
      <RouterLink to="/actions">
        <button class="btn btn-reset">Upload module</button>
      </RouterLink>
      <!-- <label class="file-upload">
        <input class="file-upload__input" type="file" name="file" @change="fileUploadChange" ref="upload-input">
        <span class="file-upload__btn btn">Upload module</span>
        <span class="file-upload__label" ref="upload-label">{{ fileLabel }}</span>
      </label> -->
    </div>
  </aside>
</template>

<style lang="scss" scoped>
@use '@/styles/mixins' as *;
@use '@/styles/base' as *;
@use '@/styles/settings' as *;

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  width: rem(250);
  height: 100%;
  background-color: $color-background;
  padding: rem(20);

  &__title {
    margin: 0;
    margin-bottom: rem(30);
  }

  &__btn {
    margin-top: auto;
  }
}
</style>
