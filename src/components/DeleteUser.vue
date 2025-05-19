<template>
  <form @submit.prevent class="form-container">
    <h2 class="form-title">Вы уверены, что хотите удалить аккаунт?</h2>

    <div class="button-wrapper">
      <my-button class="confirm-btn" @click="confirmDelete">Да</my-button>
      <my-button class="cancel-btn" @click="cancelDelete">Нет</my-button>
    </div>
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
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
}

.form-title {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #1f2937;
}

.button-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 300px;
  padding: 0 16px;
  box-sizing: border-box;
}

.confirm-btn {
  width: 100%;
  background-color: #FF0000 !important;
  color: white !important;
  border-color: #FF0000 !important;
}

.confirm-btn:hover {
  background-color: #8B0000 !important;
  border-color: #8B0000 !important;
}

.cancel-btn {
  width: 100%;
  background-color: #000000 !important;
  color: white !important;
  border-color: #000000 !important;
}

.cancel-btn:hover {
  background-color: #222222 !important;
  border-color: #222222 !important;
}
</style>
