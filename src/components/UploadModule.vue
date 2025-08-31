<script setup>
import API_CONFIG from '@/config/api.js'
import { inject, reactive } from 'vue'
import yaml from 'js-yaml'

const toast = inject('toast')
const toastOptions = inject('toastOptions')

const form = reactive({
  module_id: null,
  version: '',
  is_latest: false,
  file: null,
  helplist: '',
})

const errors = reactive({
  module_id: '',
  version: '',
  is_latest: '',
  file: '',
  helplist: '',
})

const resetForm = () => {
  form.module_id = null
  form.version = ''
  form.is_latest = false
  form.file = null
  form.helplist = ''
  Object.keys(errors).forEach((key) => (errors[key] = ''))
}

const validateForm = () => {
  errors.module_id = form.module_id ? '' : 'Module ID is required'
  errors.version = form.version ? '' : 'Version is required'
  errors.file = form.file ? '' : 'File is required'
  errors.helplist = form.helplist ? '' : 'Helplist is required'
}

const convertYamlToJson = (yamlText) => {
  try {
    const parsed = yaml.load(yamlText)
    return JSON.stringify(parsed)
  } catch (e) {
    console.error('Error parsing YAML:', e)
    return yamlText
  }
}

const uploadModuleVersion = async () => {
  validateForm()
  if (Object.values(errors).every((error) => !error)) {
    const formData = new FormData()
    formData.append('module_id', form.module_id)
    formData.append('version', form.version)
    formData.append('is_latest', form.is_latest)
    formData.append('file', form.file)
    formData.append('helplist', form.helplist)

    try {
      const response = await API_CONFIG.post(
        `/admin/upload_module_version/${form.module_id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      console.log('Module version uploaded:', response.data)
      toast.success('Module version uploaded successfully!', toastOptions)
      resetForm()
    } catch (error) {
      console.error('Error uploading module version:', error)
      toast.error('Failed to upload module version!', toastOptions)
    }
  }
}
</script>

<template>
  <form @submit.prevent="uploadModuleVersion" class="module-form">
    <fieldset>
      <legend class="visually-hidden">Upload Module Version</legend>

      <div class="form-group">
        <label class="form-label">
          Module ID*
          <input
            v-model.number="form.module_id"
            type="number"
            class="form-input"
            placeholder="Enter module ID"
          />
        </label>
        <span v-if="errors.module_id" class="error-message">{{ errors.module_id }}</span>
      </div>

      <div class="form-group">
        <label class="form-label">
          Version*
          <input
            v-model.trim="form.version"
            type="text"
            class="form-input"
            placeholder="Enter version (e.g., 1.0.0)"
          />
        </label>
        <span v-if="errors.version" class="error-message">{{ errors.version }}</span>
      </div>

      <div class="form-group">
        <label class="form-label">
          Is Latest:
          <input v-model="form.is_latest" type="checkbox" class="form-checkbox" />
        </label>
        <span v-if="errors.is_latest" class="error-message">{{ errors.is_latest }}</span>
      </div>

      <div class="form-group">
        <label class="form-label"
          >Module File*
          <input
            type="file"
            accept=".rimtub-module"
            class="form-input"
            @change="handleFileChange"
          />
        </label>
        <span v-if="errors.file" class="error-message">{{ errors.file }}</span>
      </div>

      <div class="form-group">
        <label class="form-label">
          Helplist*
          <textarea
            v-model.trim="form.helplist"
            class="form-input form-textarea"
            placeholder="Enter helplist yaml"
          >
          </textarea>
        </label>
        <span v-if="errors.helplist" class="error-message">{{ errors.helplist }}</span>
      </div>

      <div v-if="errors.server" class="form-group">
        <span class="error-message">{{ errors.server }}</span>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-reset" :disabled="isSubmitting">
          {{ isSubmitting ? 'Uploading...' : 'Upload Version' }}
        </button>
        <button
          type="button"
          class="btn btn-reset btn-secondary"
          @click="resetForm"
          :disabled="isSubmitting"
        >
          Reset
        </button>
      </div>
    </fieldset>
  </form>
</template>
