<template>
    <div class="navbar">
      <my-button @click="this.$router.push('/')">Главная</my-button>
      <my-button @click="this.$router.push('/data')">Просмотр и добавление ТКО</my-button>
      <my-button @click="this.$router.push('/updateData')">Редактирование характеристик ТКО</my-button>
      <my-button @click="this.$router.push('/deleteData')">Удаление ТКО</my-button>
    </div>
</template>

<script>

export default {
    name: 'navbar'
}
</script>
  
  <style scoped>
  .navbar {
    position: sticky;
    top: 0;
    background: white;
    padding: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    z-index: 100; /* чтобы не перекрывалась таблицей */
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  </style>  