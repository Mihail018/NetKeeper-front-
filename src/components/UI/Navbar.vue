<template>
  <div class="navbar">
    <my-button @click="$router.push('/')">Главная</my-button>
    <my-button @click="$router.push('/data')">Просмотр и добавление ТКО</my-button>
    <my-button @click="$router.push('/updateData')">Редактирование характеристик ТКО</my-button>
    <my-button @click="$router.push('/deleteData')">Удаление ТКО</my-button>
    <my-button @click="$router.push('/about')">О нас</my-button>
    <my-button @click="$router.push('/referenceMaterials')">Справка</my-button>
    
    <my-button v-if="!isAuthenticated" @click="$router.push('/login')">Войти</my-button>
    <my-button v-else @click="logout">Выйти</my-button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'navbar',

  data() {
    return {
      isAuthenticated: false
    };
  },

  created() {
    this.checkAuth();
  },

  watch: {
    // следим за маршрутом, чтобы обновить состояние при каждом переходе
    $route() {
      this.checkAuth();
    }
  },

  methods: {
    async checkAuth() {
      try {
        const response = await axios.get('/api/auth/user/me', { withCredentials: true });
        this.isAuthenticated = true; // Пользователь аутентифицирован
      } 
      catch (error) {
        this.isAuthenticated = false; // Пользователь не аутентифицирован
      }
    },

    async logout() {
      try {
        const data = await axios.post('/api/auth/logout', { withCredentials: true });
        console.log('data = ' + data);
        this.checkAuth(); // вручную обновляем
        this.$router.push('/login');
      } 
      catch (error) {
        console.error('Ошибка при выходе:', error.response || error);
      }
    }
  }
};
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  background: white;
  padding: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>