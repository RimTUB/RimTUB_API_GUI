<script setup>
import API_CONFIG from '@/config/api.js'
import { inject, reactive } from 'vue'

const toast = inject('toast')
const toastOptions = inject('toastOptions')

const form = reactive({
  name: '',
  module_uid: '',
  description: '',
  author: '',
})

const errors = reactive({
  name: '',
  module_uid: '',
  description: '',
  author: '',
})

const resetForm = () => {
  form.name = ''
  form.module_uid = ''
  form.description = ''
  form.author = ''
  Object.keys(errors).forEach((key) => (errors[key] = ''))
}

const validateForm = () => {
  errors.name = form.name ? '' : 'Name is required'
  errors.module_uid = form.module_uid ? '' : 'Module UID is required'
  errors.description = form.description ? '' : 'Description is required'
  errors.author = form.author ? '' : 'Author is required'
}

const createModule = async () => {
  validateForm()
  if (Object.values(errors).every((error) => !error)) {
    try {
      const response = await API_CONFIG.post('/admin/create_module/', null, {
        params: {
          name: form.name,
          module_uid: form.module_uid,
          description: form.description,
          author: form.author,
        },
      })
      console.log('Module created:', response.data)
      toast.success('Module created successfully!', toastOptions)
    } catch (error) {
      console.error('Error creating module:', error)
      toast.error('Failed to create module!', toastOptions)
    }
  }
}
</script>

<template>
  <form @submit.prevent="createModule" class="module-form">
    <fieldset>
      <legend class="visually-hidden">Create a new module</legend>

      <div class="form-group">
        <label class="form-label">
          Name*
          <input
            v-model.trim="form.name"
            type="text"
            class="form-input"
            placeholder="Enter module name"/>
        </label>
        <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label class="form-label">
          Module UID*
          <input
            v-model.trim="form.module_uid"
            type="text"
            class="form-input"
            placeholder="Enter unique module ID"/>
        </label>
        <span v-if="errors.module_uid" class="error-message">{{ errors.module_uid }}</span>
      </div>

      <div class="form-group">
        <label class="form-label">
          Description*
          <textarea
            v-model.trim="form.description"
            class="form-input form-textarea"
            placeholder="Describe the module">
          </textarea>
        </label>
        <span v-if="errors.description" class="error-message">{{ errors.description }}</span>
      </div>

      <div class="form-group">
        <label class="form-label">
          Author*
          <input
            v-model.trim="form.author"
            type="text"
            class="form-input"
            placeholder="Enter author name"/>
        </label>
        <span v-if="errors.author" class="error-message">{{ errors.author }}</span>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-reset">Create Module</button>
        <button type="button" class="btn btn-reset btn-secondary" @click="resetForm">Reset</button>
      </div>
    </fieldset>
  </form>
</template>

<style lang="scss" scoped>

</style>
