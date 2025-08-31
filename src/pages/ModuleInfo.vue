<script setup>
import SideBar from '@/components/SideBar.vue'
import API_CONFIG, { URL } from '@/config/api.js'
import { onMounted, ref, inject } from 'vue'
import { useRoute } from 'vue-router'

const toast = inject('toast')
const toastOptions = inject('toastOptions')


const router = useRoute()
const moduleName = decodeURIComponent(router.params.moduleName)

const moduleInfo = ref([])
const versionId = ref(null)
const versions = ref([])

const toggleDetails = (id) => {
  versionId.value = versionId.value === id ? null : id
}

const copyCommand = async (name, version) => {
  const command = `.dml ${URL}/get_module/${name}/${version}`
  try {
    await navigator.clipboard.writeText(command)
    toast.success('Command copied!', toastOptions)
  } catch (err) {
    console.error('Ошибка копирования:', err)
    toast.error('Copy error!', toastOptions)
  }
}

const downloadVersion = async (versionId) => {
  try {
    const response = await API_CONFIG.get(`/g/${versionId}`)
    console.log(response)
  } catch (error) {
    console.error('Ошибка при скачивании файла:', error)
    if (error.response?.status === 401) {
      console.error('Ошибка авторизации: проверьте токен')
    } else if (error.response?.status === 404) {
      console.error('Файл не найден для version_id:', versionId)
    }
  }
}

onMounted(async () => {
  try {
    const response = await API_CONFIG.get(`/search_modules/?query=${moduleName}`)

    const module = response.data.find(m => m.name === moduleName)

    if (!module) {
      toast.error('Модуль не найден', toastOptions)
      return
    }

    moduleInfo.value = module

    const versionsResponse = await API_CONFIG.get(`/get_module_versions/${module.id}`)
    versions.value = versionsResponse.data.sort((a, b) => b.latest - a.latest)
  } catch (error) {
    console.error('Module fetch error:', error)
  }
})
</script>

<template>
  <SideBar />
  <div class="container">
    <div class="module-info" v-if="moduleInfo">
      <div class="module-info__brief">
        <h1>{{ moduleInfo.name }}</h1>
        <p><span class="important">Author:</span> {{ moduleInfo.author }}</p>
        <p><span class="important">Description:</span> {{ moduleInfo.description }}</p>
        <p><span class="important">Downloads:</span> {{ moduleInfo.downloads }}</p>
      </div>

      <h2>Версии:</h2>
      <div v-for="version in versions" :key="version.id" class="version-card">
        <h3 class="version-card__title">Версия: {{ version.version }}</h3>
        <p>ID: {{ version.id }}</p>

        <div class="buttons">
          <button class="btn btn-reset" @click="copyCommand(moduleInfo.name, version.version)">Скопировать команду</button>
          <button class="btn btn-reset" @click="downloadVersion(version.id)">Скачать</button>
          <button class="btn btn-reset" @click="toggleDetails(version.id)">
            {{ versionId === version.id ? 'Скрыть' : 'Подробнее' }}
          </button>
        </div>

        <div v-if="versionId === version.id" class="details">
          <pre>{{ version }}</pre>
        </div>
      </div>

      <h4 class="module-info__full">Full JSON Outhput</h4>
      <div v-if="moduleInfo" class="details">
        <pre>{{ moduleInfo }}</pre>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/mixins' as *;
@use '@/styles/base' as *;
@use '@/styles/settings' as *;

.module-info {
  padding: rem(20);

  &__brief {
    margin-bottom: rem(30);
    padding-bottom: rem(10);
    border-bottom: rem(2) solid $color-border;
  }

  &__full {
    margin-top: rem(30);
  }
}

.version-card {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid $color-border;
  border-radius: rem(5);
  background-color: $color-background;

  &__title {
    margin-top: 0;
  }
}

.buttons {
  display: flex;
  gap: 1rem;
  margin-top: rem(25);
}

.details {
  margin-top: 1rem;
  background-color: #eee;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  white-space: pre-wrap;
}
</style>
