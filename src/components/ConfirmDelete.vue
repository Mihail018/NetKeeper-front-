<template>
  <form @submit.prevent class="form-container">
    <h2>Вы уверены, что хотите удалить данный элемент?</h2>
    <div class="button-wrapper">
      <my-button class="confirm-btn" @click="confirmDelete">Да</my-button>
      <my-button class="cancel-btn" @click="cancelDelete">Нет</my-button>
    </div>
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
    confirmDelete() {
      this.$emit('delete', this.itemId);
    },
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

.confirm-btn {
  background-color: #FF0000 !important;
  color: white !important;
  border-color: #FF0000 !important;
}

.confirm-btn:hover {
  background-color :#8B0000 !important;
  border-color: #8B0000 !important;
}

.cancel-btn {
  background-color: #000000;
  color: white;
  border-color: #000000;
}

.cancel-btn:hover {
  background-color: #000000;
  color: white;
  border-color: #000000;
}
</style>
