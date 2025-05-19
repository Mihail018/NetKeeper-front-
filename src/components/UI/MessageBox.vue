<template>
    <form @submit.prevent class="form-container">
      <h2>{{ message }}</h2>
      <div class="button-wrapper">
        <my-button @click="onConfirm">{{ confirmBtnMessage }}</my-button>
        <my-button @click="onCancel">{{ cancelBtnMessage }}</my-button>
      </div>
    </form>
  </template>
  
  <script>
  export default {
    name: 'message-box',
    props: {
        message: {
            type: String,
            required: true
        },

        onConfirm: {
            type: Function,
            required: true
        },
            
        onCancel: {
            type: Function,
            required: true
        },

        confirmBtnMessage: {
            type: String,
            required: true
        },

        cancelBtnMessage: {
            type: String,
            required: true
        },
    }
  }
  </script>
  
  <style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.button-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
  width: 100%;
  max-width: 300px;
}

.button-wrapper my-button {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
