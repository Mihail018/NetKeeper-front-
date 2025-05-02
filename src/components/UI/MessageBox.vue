<template>
    <form @submit.prevent>
      <h4>{{ message }}</h4>
      <my-button class="confirm-btn" @click="onConfirm">{{ confirmBtnMessage }}</my-button>
      <my-button class="cancel-btn" @click="onCancel">{{ cancelBtnMessage }}</my-button>
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
  .confirm-btn,
  .cancel-btn {
    margin-right: 10px;
  }
  </style>