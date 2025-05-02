<template>
    <form @submit.prevent>
      <h4>Вы уверены, что хотите удалить данный элемент?</h4>
      <my-button class="confirm-btn" @click="confirmDelete">Да</my-button>
      <my-button class="cancel-btn" @click="cancelDelete">Нет</my-button>
    </form>
  </template>
  
  <script>
  export default {
    name: 'confirm-delete',
    props: {
      itemId: {
        type: Number,
        required: true
      }
    },
    
    methods: {
      // Подтверждение удаления
      confirmDelete() {
        this.$emit('delete', this.itemId);
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