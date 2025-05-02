<template>
  <form @submit.prevent>
    <h3>Выберите способ добавления:</h3>
    <my-button @click="$emit('create', 'manual')">Ручной ввод</my-button> <br><br>
    <my-button @click="$router.push('/autoAdd')">Автоматический ввод</my-button>
  </form>
</template>

<script>
export default {
  name: 'input-choise-form'
}
</script>

<style scoped>

</style>