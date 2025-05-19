<template>
  <form @submit.prevent class="form-container">
    <h2>Выберите способ добавления:</h2>
    <div class="button-wrapper">
      <my-button @click="$emit('create', 'manual')">Ручной ввод</my-button>
      <my-button @click="$router.push('/autoAdd')">Автоматический ввод</my-button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'input-choise-form'
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
  max-width: 300px; /* Ограничиваем максимальную ширину */
}

.button-wrapper my-button {
  width: 100%; /* Заставим кнопку занимать всю ширину контейнера */
  display: flex;
  justify-content: center;
}
</style>
