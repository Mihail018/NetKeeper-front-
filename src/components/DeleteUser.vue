<template>
    <form @submit.prevent>
      <h1>Вы уверены, что хотите удалить аккаунт?</h1>
      <my-button class="confirm-btn" @click="confirmDelete">Да</my-button>
      <my-button class="cancel-btn" @click="cancelDelete">Нет</my-button>
    </form>
  </template>
  
  <script>
  export default {
    name: 'delete-user',
    
    methods: {
      // Подтверждение удаления
      confirmDelete() {
        this.$emit('confirm');
      },
      // Отмена удаления
      cancelDelete() {
        this.$emit('close');
      }
    }
  }
  </script>
  
  <style scoped>
  .confirm-btn,
  .cancel-btn {
    margin-right: 10px;
  }
  </style>